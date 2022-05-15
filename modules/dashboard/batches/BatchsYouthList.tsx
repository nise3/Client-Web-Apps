import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSE_ENROLLMENTS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconUser from '../../../@softbd/icons/IconUser';
import Genders from '../../../@softbd/utilities/Genders';
import Router, {useRouter} from 'next/router';
import Link from 'next/link';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import {useFetchBatch} from '../../../services/instituteManagement/hooks';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExamListPopup from './ExamListPopup';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';

const YouthPage = () => {
  const {messages} = useIntl();

  const router = useRouter();
  const path = router.asPath;
  const {batchId} = router.query;
  const {data: batch, isLoading} = useFetchBatch(Number(batchId));
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [selectedYouthId, setSelectedYouthId] = useState<number | null>(null);
  const [isOpenExamListModal, setIsOpenExamListModal] = useState(false);
  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },
      {
        Header: messages['youth.username'],
        accessor: 'username',
        disableFilters: true,
        isVisible: false,
      },
      {
        Header: messages['youth.fullName'],
        accessor: 'full_name',
        disableFilters: true,
      },
      {
        Header: messages['youth.gender'],
        accessor: 'gender_label',
        disableFilters: true,
        isVisible: false,
      },
      {
        Header: messages['youth.mobile'],
        accessor: 'mobile',
        disableFilters: true,
      },
      {
        Header: messages['youth.email'],
        accessor: 'email',
        disableFilters: true,
        isVisible: false,
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <Link href={`${path}/youth-cv/${data?.youth_id}`} passHref={true}>
                <CommonButton
                  btnText='applicationManagement.viewCV'
                  startIcon={<FiUser style={{marginLeft: '5px'}} />}
                  style={{marginTop: '10px'}}
                />
              </Link>

              <CommonButton
                key={2}
                onClick={() => openExamListModal(data.id, data.youth_id)}
                btnText={messages['batches.marksheet'] as string}
                variant={'outlined'}
                color={'primary'}
                style={{marginLeft: '20px'}}
                // startIcon={<DownloadIcon />}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  // TODO:: Change the api route whenever its ready
  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_COURSE_ENROLLMENTS,
      paramsValueModifier: (params: any) => {
        if (batchId) params['batch_id'] = batchId;
        return params;
      },
    });

  const filteredData = data.map((youth: any) => {
    let gender_label: string;
    if (youth.gender === parseInt(Genders.MALE)) {
      gender_label = 'Male';
    } else if (youth.gender === parseInt(Genders.FEMALE)) {
      gender_label = 'Female';
    } else {
      gender_label = 'Others';
    }
    return {
      ...youth,
      gender_label,
      full_name: youth.first_name + ' ' + youth.last_name,
    };
  });

  const openExamListModal = useCallback((itemId: number, youthId: number) => {
    setIsOpenExamListModal(true);
    setSelectedItemId(itemId);
    setSelectedYouthId(youthId);
  }, []);

  const closeExamListModal = useCallback(() => {
    setIsOpenExamListModal(false);
  }, []);

  //console.log(filteredData);
  return (
    <>
      {!isLoading && (
        <PageBlock
          title={
            <>
              <IconUser /> <IntlMessages id='youth.label' />{' '}
              {`(${batch.title})`}
            </>
          }
          extra={
            <Button
              startIcon={<ArrowBackIcon />}
              variant='outlined'
              onClick={() => Router.back()}
              style={{float: 'right', right: '10px', top: '10px'}}>
              {messages['common.back']}
            </Button>
          }>
          <ReactTable
            columns={columns}
            data={filteredData}
            fetchData={onFetchData}
            loading={loading}
            pageCount={pageCount}
            totalCount={totalCount}
          />
          {isOpenExamListModal && (
            <ExamListPopup
              key={1}
              itemId={selectedItemId}
              youthId={selectedYouthId}
              onClose={closeExamListModal}
            />
          )}
        </PageBlock>
      )}
    </>
  );
};

export default YouthPage;
