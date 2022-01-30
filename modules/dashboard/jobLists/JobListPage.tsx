import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_JOBS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  deleteJob,
  getJobId,
} from '../../../services/IndustryManagement/JobService';
import {
  getMomentDateFormat,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import {useRouter} from 'next/router';
import {
  LINK_JOB_CREATE_OR_UPDATE,
  LINK_JOB_DETAILS_VIEW,
} from '../../../@softbd/common/appLinks';

const JobListPage = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const router = useRouter();

  //const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const openJobCreateView = useCallback(() => {
    (async () => {
      try {
        const response = await getJobId();

        if (response && response?.data) {
          openJobAddUpdateView(response.data);
        } else {
          errorStack('Failed to get job id');
        }
      } catch (error: any) {
        errorStack('Failed to get job id');
      }
    })();
  }, []);

  const openJobAddUpdateView = useCallback((jobId: string) => {
    router
      .push({
        pathname: LINK_JOB_CREATE_OR_UPDATE + 'step1',
        query: {jobId: jobId},
      })
      .then(() => {});
  }, []);

  const openJobDetailsView = useCallback((jobId: string) => {
    router
      .push({
        pathname: LINK_JOB_DETAILS_VIEW + jobId,
      })
      .then(() => {});
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
        Header: messages['common.post'],
        accessor: 'job_title',
      },
      {
        Header: messages['common.publish_at'],
        accessor: 'published_at',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              {data.published_at
                ? getMomentDateFormat(data.published_at, 'MM-DD-YYYY')
                : 'Not published yet'}
            </>
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;

          return (
            <DatatableButtonGroup>
              <ReadButton
                onClick={() => {
                  openJobDetailsView(data.job_id);
                }}
              />
              <EditButton
                onClick={() => {
                  openJobAddUpdateView(data.job_id);
                }}
              />
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
      urlPath: API_JOBS,
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
