// import {FiUserCheck} from 'react-icons/fi';

import React, {useMemo} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_COURSE_ENROLLMENTS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconUser from '../../../@softbd/icons/IconUser';
import Genders from '../../../@softbd/utilities/Genders';
import Link from 'next/link';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import {useFetchBatch} from '../../../services/instituteManagement/hooks';
import {Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {IPageHeader} from '../4IRSteppers';

interface Props {
  batchId: number;
  pageHeader: IPageHeader;
  previousHandler: () => void;
}

const YouthPage = ({batchId, previousHandler, pageHeader}: Props) => {
  const {messages} = useIntl();

  const {data: batch, isLoading} = useFetchBatch(Number(batchId));
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
            <Link
              href={`/batches/${batchId}/youths/youth-cv/${data?.youth_id}`}
              passHref={true}>
              <CommonButton
                btnText='applicationManagement.viewCV'
                startIcon={<FiUser style={{marginLeft: '5px'}} />}
                style={{marginTop: '10px'}}
              />
            </Link>
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

  console.log(filteredData);
  return (
    <>
      {!isLoading && (
        <PageBlock
          title={
            <>
              <IconUser /> <IntlMessages id='youth.label' />{' '}
              {`(${batch.title})`}{' '}
              {`(${pageHeader.tagline_name} > ${pageHeader?.initative_name})`}
            </>
          }
          extra={
            <Button
              startIcon={<ArrowBackIcon />}
              variant='outlined'
              onClick={() => previousHandler()}
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
        </PageBlock>
      )}
    </>
  );
};

export default YouthPage;
