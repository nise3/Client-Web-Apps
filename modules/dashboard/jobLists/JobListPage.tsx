import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
  publishJob,
} from '../../../services/IndustryManagement/JobService';
import {
  getCalculatedSerialNo,
  //getMomentDateFormat,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import {useRouter} from 'next/router';
import {
  LINK_JOB_CREATE_OR_UPDATE,
  LINK_JOB_DETAILS_VIEW,
} from '../../../@softbd/common/appLinks';
import ApproveButton from '../industry-associations/ApproveButton';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import {Link} from '../../../@softbd/elements/common';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {JobLevel} from './jobPost/enums/JobPostEnums';
import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';
import {getBrowserCookie} from '../../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../../shared/constants/AppConst';
//import {useFetchJobSectors} from '../../../services/organaizationManagement/hooks';

const JobListPage = () => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const router = useRouter();
  const language = getBrowserCookie(COOKIE_KEY_APP_CURRENT_LANG) || 'bn';

  //const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  //const [jobSectorFilters] = useState({});
  //const {data: jobSectors}: any = useFetchJobSectors(jobSectorFilters);

  const [skillFilters] = useState<any>({});
  const {data: skills} = useFetchPublicSkills(skillFilters);
  const [skillFilterItems, setSkillFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);
  /*  const [jobSectorFilterItems, setJobSectorFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);*/

  useEffect(() => {
    if (skills) {
      setSkillFilterItems(
        skills.map((skill: any) => {
          if (language === 'bn') {
            return {
              id: skill?.id,
              title: skill?.title,
            };
          } else {
            return {
              id: skill?.id,
              title: skill?.title_en,
            };
          }
        }),
      );
    }
  }, [skills]);

  /*useEffect(() => {
    if (jobSectors) {
      setJobSectorFilterItems(
        jobSectors.map((jobSector: any) => {
          if (language === 'bn') {
            return {
              id: jobSector?.id,
              title: jobSector?.title,
            };
          } else {
            return {
              id: jobSector?.id,
              title: jobSector?.title_en,
            };
          }
        }),
      );
    }
  }, [jobSectors]);*/

  const courseLevelFilterItems = [
    {id: JobLevel.ENTRY, title: messages['label.job_level_entry'] as string},
    {id: JobLevel.MID, title: messages['label.job_level_mid'] as string},
    {id: JobLevel.TOP, title: messages['label.job_level_top'] as string},
  ];

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
          values={{subject: <IntlMessages id='common.jobs' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const publishAction = async (jobId: string) => {
    try {
      const data: any = {status: 1};
      let response = await publishJob(jobId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_publish_successfully'
            values={{subject: <IntlMessages id='common.job' />}}
          />,
        );
        refreshDataTable();
      }
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  };

  const archiveAction = async (jobId: string) => {
    const data: any = {status: 2};
    let response = await publishJob(jobId, data);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_publish_successfully'
          values={{subject: <IntlMessages id='common.job' />}}
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
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },
      {
        Header: messages['common.post'],
        accessor: 'job_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.post_en'],
        accessor: 'job_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      /*{
        Header: messages['job_sectors.label'],
        accessor: 'job_sector_ids',
        selectFilterItems: jobSectorFilterItems,
        Cell: (props: any) => {
          const data = props?.row?.original;
          return <>{data?.job_sector_id}</>;
        },
      },*/

      /*{
        Header: messages['label.job_sector'],
        //filter: 'selectFilter',
        accessor: 'job_sector_id',
        /!*selectFilterItems: jobSectors,
        Cell: (props: any) => {
          let data = props.row.original;
          if (data?.job_sector_id) {
            return <>{data?.job_sector_id}</>;
          }
        },*!/
      },*/

      {
        Header: messages['label.job_level'],
        filter: 'selectFilter',
        accessor: 'job_level',
        selectFilterItems: courseLevelFilterItems,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              {data?.additional_job_information?.job_levels?.map(
                (job_level: any) =>
                  (job_level?.job_level_id == JobLevel.ENTRY
                    ? messages['label.job_level_entry']
                    : job_level.job_level_id == JobLevel.MID
                    ? messages['label.job_level_mid']
                    : messages['label.job_level_top']) + `,`,
              )}
            </>
          );
        },
      },
      {
        Header: messages['skill.label'],
        accessor: 'skill_ids',
        filter: 'selectFilter',
        isVisible: false,
        selectFilterItems: skillFilterItems,
        Cell: (props: any) => {
          const data = props?.row?.original;
          return data?.candidate_requirement?.skills?.map((skill: any) => (
            <>{skill?.title_en + `, `}</>
          ));
        },
      },

      /*{
        Header: messages['common.member'],
        accessor: 'organization_title',
        Cell: (props: any) => {
          let data = props.row.original;
          if (data?.organization_id) {
            return <>{data?.organization_title}</>;
          } else {
            return <>{messages['member.none']}</>;
          }
        },
      },
      {
        Header: messages['common.publish_at'],
        accessor: 'published_at',
        filter: 'dateTimeFilter',
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
        Header: messages['common.publication_deadline'],
        accessor: 'application_deadline',
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              {data.application_deadline
                ? getMomentDateFormat(data.application_deadline, 'MM-DD-YYYY')
                : 'Not fixed yet'}
            </>
          );
        },
      },*/
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          let today = new Date().toISOString().slice(0, 10);
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
              {!data?.published_at && data?.application_deadline >= today && (
                <ApproveButton
                  approveAction={() => publishAction(data.job_id)}
                  approveTitle={messages['common.publish'] as string}
                />
              )}
              {data?.published_at && data?.application_deadline < today ? (
                <ApproveButton
                  approveAction={() => archiveAction(data.job_id)}
                  approveTitle={messages['common.archive'] as string}
                />
              ) : (
                <></>
              )}
              <Link href={`${'jobs/candidates'}/${data?.job_id}`}>
                <CommonButton
                  btnText='common.candidates'
                  startIcon={<FiUser style={{marginLeft: '5px'}} />}
                  variant={'text'}
                />
              </Link>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [
      messages,
      locale,
      courseLevelFilterItems,
      skillFilterItems,
      //jobSectorFilterItems,
    ],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_JOBS,
      filters: {
        job_title: 'search_text',
      },
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
