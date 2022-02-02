import React, {useMemo} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_YOUTHS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconUser from '../../../@softbd/icons/IconUser';
import Genders from '../../../@softbd/utilities/Genders';
import {useRouter} from 'next/router';
import Link from 'next/link';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';

const CVListsPage = () => {
  const {messages} = useIntl();

  const router = useRouter();
  const path = router.pathname;

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
      },
      {
        Header: messages['youth.email'],
        accessor: 'email',
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
            <Link href={`${path}/${data?.id}`} passHref={true}>
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
      urlPath: API_YOUTHS,
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
            <IconUser /> <IntlMessages id='common.cv_list' />
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

export default CVListsPage;
