import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {
  useFetchHumanResourceDemand,
  useFetchLocalizedInstituteHumanResourceDemands,
} from '../../../services/IndustryManagement/hooks';
import {Button} from '@mui/material';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import PersonIcon from '@mui/icons-material/Person';

const JobRequirementManagePage = () => {
  const {successStack} = useNotiStack();
  const {messages, locale} = useIntl();
  const router = useRouter();
  const {jobRequirementId} = router.query;
  const [
    instituteHumanResourceDemandFilter,
    setInstituteHumanResourceDemandFilter,
  ] = useState<any>(null);

  const {data: humanResourceDemandData} = useFetchHumanResourceDemand(
    Number(jobRequirementId),
  );

  const {
    data: HRDemandInstitutes,
    isLoading: isLoadingHumanResourceDemandInstitutes,
    mutate: mutateHRDemandInstitutes,
  } = useFetchLocalizedInstituteHumanResourceDemands(
    instituteHumanResourceDemandFilter,
  );

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
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.vacancy'],
        accessor: 'hr_demand.vacancy',
        Cell: (props: any) => {
          let data: any = props.row.original;
          return (
            <CustomChip
              icon={<PersonIcon fontSize={'small'} />}
              color={'primary'}
              label={data.hr_demand?.vacancy}
            />
          );
        },
      },
      {
        Header: messages['common.provided_vacancy_by_institute'],
        accessor: 'vacancy_provided_by_institute',
        Cell: (props: any) => {
          let data: any = props.row.original;
          return (
            <CustomChip
              icon={<PersonIcon fontSize={'small'} />}
              color={'primary'}
              label={data.vacancy_provided_by_institute}
            />
          );
        },
      },
      {
        Header: messages['common.approved_vacancy'],
        accessor: 'vacancy_approved_by_industry_association',
        Cell: (props: any) => {
          let data: any = props.row.original;
          return (
            <CustomChip
              icon={<PersonIcon fontSize={'small'} />}
              color={'primary'}
              label={data.vacancy_approved_by_industry_association}
            />
          );
        },
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
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          const APPROVE_YOUTHS_PAGE_URL =
            '/job-requirement/youth-approval/' + data.id;
          return (
            canRejectApprove(data) && (
              <DatatableButtonGroup>
                <Link href={APPROVE_YOUTHS_PAGE_URL} passHref>
                  <Button
                    variant={'outlined'}
                    size={'small'}
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      marginRight: '15px',
                    }}
                    startIcon={<DoneIcon />}>
                    {messages['button.youth_approve']}
                  </Button>
                </Link>
                {!data?.rejected_by_industry_association && (
                  <RejectButton
                    variant={'outlined'}
                    size={'small'}
                    itemId={data.id}
                    rejectTitle={messages['common.youth'] as string}
                    rejectAction={rejectAction}>
                    {messages['common.reject']}
                  </RejectButton>
                )}
              </DatatableButtonGroup>
            )
          );
        },
        sortable: false,
      },
    ],
    [messages, HRDemandInstitutes, locale],
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
