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
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import {useFetchBatch} from '../../../services/instituteManagement/hooks';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExamListPopup from './ExamListPopup';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import {Link} from '../../../@softbd/elements/common';

const YouthPage = () => {
  const {messages} = useIntl();

  const router = useRouter();
  const path = router.asPath;
  const {batchId} = router.query;
  const {data: batch, isLoading} = useFetchBatch(Number(batchId));
  const [selectedYouthId, setSelectedYouthId] = useState<number | null>(null);
  const [isOpenExamListModal, setIsOpenExamListModal] = useState(false);

  const getGenderText = (gender: any) => {
    switch (String(gender)) {
      case Genders.MALE:
        return messages['common.male'];
      case Genders.FEMALE:
        return messages['common.female'];
      case Genders.OTHERS:
        return messages['common.others'];
      default:
        return '';
    }
  };

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
        accessor: 'first_name',
        Cell: (props: any) => {
          let data = props.row.original;
          return data?.first_name + ' ' + data?.last_name;
        },
        disableFilters: true,
      },
      {
        Header: messages['youth.gender'],
        accessor: 'gender',
        Cell: (props: any) => {
          let data = props.row.original;
          return getGenderText(data?.gender);
        },
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
              {data?.result_published_at ? (
                <></>
              ) : (
                <CommonButton
                  key={2}
                  onClick={() => openExamListModal(data.youth_id)}
                  btnText={'batches.mark_distribution'}
                  variant={'outlined'}
                  color={'primary'}
                  style={{marginLeft: '20px'}}
                />
              )}
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_COURSE_ENROLLMENTS,
      paramsValueModifier: (params: any) => {
        if (batchId) params['batch_id'] = batchId;
        return params;
      },
    });

  const openExamListModal = useCallback((youthId: number) => {
    setIsOpenExamListModal(true);
    setSelectedYouthId(youthId);
  }, []);

  const closeExamListModal = useCallback(() => {
    setIsOpenExamListModal(false);
    setSelectedYouthId(null);
  }, []);

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
            data={data || []}
            fetchData={onFetchData}
            loading={loading}
            pageCount={pageCount}
            totalCount={totalCount}
          />
          {isOpenExamListModal && batch && selectedYouthId && (
            <ExamListPopup
              key={1}
              batchId={Number(batchId)}
              courseId={Number(batch.course_id)}
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
