import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {
  useFetchHumanResourceDemand,
  useFetchInstituteHumanResourceDemands,
} from '../../../services/IndustryManagement/hooks';
import {Button} from '@mui/material';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import Link from 'next/link';
import DoneIcon from '@mui/icons-material/Done';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import BackButton from '../../../@softbd/elements/button/BackButton';
import RejectButton from '../../../@softbd/elements/button/RejectButton/RejectButton';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {rejectInstituteJobRequirement} from '../../../services/IndustryManagement/JobRequirementService';

const JobRequirementManagePage = () => {
  const {successStack} = useNotiStack();
  const {messages} = useIntl();
  const router = useRouter();
  const {jobRequirementId} = router.query;
  const [
    instituteHumanResourceDemandFilter,
    setInstituteHumanResourceDemandFilter,
  ] = useState<any>({});

  const {data: humanResourceDemandData} = useFetchHumanResourceDemand(
    Number(jobRequirementId),
  );

  const {
    data: HRDemandInstitutes,
    isLoading: isLoadingHumanResourceDemandInstitutes,
    mutate: mutateHRDemandInstitutes,
  } = useFetchInstituteHumanResourceDemands(instituteHumanResourceDemandFilter);

  useEffect(() => {
    setInstituteHumanResourceDemandFilter({hr_demand_id: jobRequirementId});
  }, [jobRequirementId]);

  const canRejectApprove = useCallback((data: any) => {
    return (
      data?.vacancy_provided_by_institute > 0 && !data?.rejected_by_institute
    );
  }, []);

  const rejectAction = async (itemId: number) => {
    let response = await rejectInstituteJobRequirement(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_rejected'
          values={{subject: <IntlMessages id='common.institute' />}}
        />,
      );

      mutateHRDemandInstitutes();
    }
  };

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
        Header: messages['institute.label'],
        accessor: 'institute_title',
      },
      {
        Header: messages['skill.label'],
        accessor: 'skill_title',
      },
      {
        Header: messages['job_requirement.institute_step'],
        accessor: 'rejected_by_institute',
        Cell: (props: any) => {
          let data = props.row.original;
          let step: any = '';
          let btnColor: any = undefined;

          if (
            data?.rejected_by_institute == 0 &&
            data?.vacancy_provided_by_institute == 0
          ) {
            step = messages['common.pending'];
            btnColor = 'primary';
          } else if (data?.rejected_by_institute) {
            step = messages['common.rejected'];
            btnColor = 'error';
          } else {
            step = messages['common.approved'];
            btnColor = 'success';
          }
          return (
            <CustomChip label={step} variant={'filled'} color={btnColor} />
          );
        },
      },
      {
        Header: messages['job_requirement.industry_association_step'],
        accessor: 'rejected_by_industry_association',
        Cell: (props: any) => {
          let data = props.row.original;
          let step: any = '';
          let btnColor: any = undefined;

          if (
            data?.rejected_by_industry_association == 0 &&
            data?.vacancy_approved_by_industry_association == 0
          ) {
            step = messages['common.pending'];
            btnColor = 'primary';
          } else if (data?.rejected_by_industry_association) {
            step = messages['common.rejected'];
            btnColor = 'error';
          } else {
            step = messages['common.approved'];
            btnColor = 'success';
          }
          return (
            <CustomChip label={step} variant={'filled'} color={btnColor} />
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
          const APPROVE_YOUTHS_PAGE_URL =
            '/job-requirement/youth-approval/' + data.id;

          const APPROVE_CV_PAGE_URL = '/job-requirement/cv-approval/' + data.id;
          return (
            canRejectApprove(data) && (
              <DatatableButtonGroup>
                <Link href={APPROVE_YOUTHS_PAGE_URL} passHref>
                  <Button
                    sx={{color: (theme) => theme.palette.secondary.main}}
                    startIcon={<DoneIcon />}>
                    {messages['button.youth_approve']}
                  </Button>
                </Link>
                <Link href={APPROVE_CV_PAGE_URL} passHref>
                  <Button
                    sx={{color: (theme) => theme.palette.primary.main}}
                    startIcon={<DoneIcon />}>
                    {messages['common.cv_approve']}
                  </Button>
                </Link>
                <RejectButton
                  itemId={data.id}
                  rejectTitle={messages['common.youth'] as string}
                  rejectAction={rejectAction}>
                  {messages['common.reject']}
                </RejectButton>
              </DatatableButtonGroup>
            )
          );
        },
        sortable: false,
      },
    ],
    [messages, HRDemandInstitutes],
  );

  return (
    <>
      <PageBlock
        title={
          <IntlMessages
            id='common.org_job_requirements'
            values={{subject: humanResourceDemandData?.organization_title}}
          />
        }
        extra={[<BackButton key={1} url={'/job-requirement'} />]}>
        <ReactTable
          columns={columns}
          data={HRDemandInstitutes || []}
          loading={isLoadingHumanResourceDemandInstitutes}
          skipDefaultFilter={true}
        />
      </PageBlock>
    </>
  );
};

export default JobRequirementManagePage;
