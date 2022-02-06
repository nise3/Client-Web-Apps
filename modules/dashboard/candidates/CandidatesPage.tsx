import React, {useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_GET_JOB_CANDIDATES} from '../../../@softbd/common/apiRoutes';
import {useRouter} from 'next/router';

const CandidatesPage = () => {
  const {messages} = useIntl();

  const router = useRouter();
  const {jobIdCandidates} = router.query;

  const [isToggleTable] = useState<boolean>(false);

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_GET_JOB_CANDIDATES + `/${jobIdCandidates}`,
    });

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
        Header: messages['common.name'],
        accessor: 'youth_profile.first_name',
      },
      {
        Header: messages['youth.mobile'],
        accessor: 'youth_profile.mobile',
      },
      {
        Header: messages['youth.email'],
        accessor: 'youth_profile.email',
      },
      {
        Header: messages['common.expected_salary'],
        accessor: 'expected_salary',
      },
      // {
      //   Header: messages['common.actions'],
      //   Cell: (props: any) => {
      //     let data = props.row.original;
      //     return <DatatableButtonGroup></DatatableButtonGroup>;
      //   },
      //   sortable: false,
      // },
    ],
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='common.candidates_list' />
          </>
        }
        // extra={[
        //   <AddButton
        //       key={1}
        //       onClick={() => console.log('dd')}
        //       isLoading={loading}
        //       tooltip={
        //         <IntlMessages
        //             id={'common.add_new'}
        //             values={{
        //               subject: messages['job_lists.label'],
        //             }}
        //         />
        //       }
        //   />,
        // ]}
      >
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
      </PageBlock>
    </>
  );
};

export default CandidatesPage;
