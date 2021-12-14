import React, {useMemo} from 'react';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {useIntl} from 'react-intl';

const IndustryListView = () => {
  const {messages} = useIntl();

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return props.row.index + 1;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.company_name_bn'],
        accessor: 'name',
      },
      {
        Header: messages['common.type'],
        accessor: 'type',
      },
      {
        Header: messages['dashboard.new_recruits'],
        accessor: 'new_recruit',
      },
      {
        Header: messages['common.job_vacancy'],
        accessor: 'job_vacancy',
      },
      {
        Header: messages['common.employed'],
        accessor: 'employed',
      },
    ],
    [messages],
  );

  return (
    <ReactTable
      columns={columns}
      data={[]}
      loading={false}
      skipDefaultFilter={true}
      hideToolbar={true}
    />
  );
};

export default IndustryListView;
