import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_JOB_LISTS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {deleteJob} from '../../../services/IndustryManagement/JobService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import PersonIcon from '@mui/icons-material/Person';
import {useRouter} from 'next/router';
import {LINK_JOB_CREATE_OR_UPDATE} from '../../../@softbd/common/appLinks';

const JobListPage = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const router = useRouter();

  //const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const openJobCreateView = useCallback(() => {
    (async () => {
      try {
        const jobId = 'IDSA-2fe8e68e-4456-43be-9d9d-481974a41890'; //await getJobId();

        if (jobId) {
          router
            .push({
              pathname: LINK_JOB_CREATE_OR_UPDATE + 'step1',
              query: {jobId: jobId},
            })
            .then(() => {});
        } else {
          errorStack('Failed to get job id');
        }
      } catch (error: any) {
        errorStack('Failed to get job id');
      }
    })();
  }, []);

  const deleteJobItem = async (jobId: number) => {
    let response = await deleteJob(jobId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='job_lists.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle: any) => !prevToggle);
  }, [isToggleTable]);

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
        Header: messages['common.job_id'],
        accessor: 'job_id',
      },
      {
        Header: messages['common.post'],
        accessor: 'position',
      },
      {
        Header: messages['common.industry'],
        accessor: 'industry',
      },
      {
        Header: messages['common.applicants'],
        accessor: 'applicants',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              <CustomChip
                icon={<PersonIcon fontSize={'small'} />}
                color={'primary'}
                label={data.no_of_applicant}
              />
            </>
          );
        },
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
              <ReadButton onClick={() => {}} />
              <EditButton onClick={() => {}} />
              <DeleteButton
                deleteAction={() => deleteJobItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
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
      urlPath: API_JOB_LISTS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='job_lists.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openJobCreateView()}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['job_lists.label'],
                }}
              />
            }
          />,
        ]}>
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

export default JobListPage;
