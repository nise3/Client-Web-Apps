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
import {useRouter} from 'next/router';
import Link from 'next/link';
import AssignBatchButton from '../applicationManagement/AssignBatchButton';
import {FiUser} from 'react-icons/fi';

const YouthPage = () => {
  const {messages} = useIntl();

  const router = useRouter();
  const path = router.pathname;
  const {batchId} = router.query;

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return props.row.index + 1;
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
            <Link href={`${path}/youth-cv/${data?.id}`} passHref={true}>
              <AssignBatchButton
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

  return (
    <>
      <PageBlock
        title={
          <>
            <IconUser /> <IntlMessages id='youth.label' />
          </>
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
    </>
  );
};

export default YouthPage;
