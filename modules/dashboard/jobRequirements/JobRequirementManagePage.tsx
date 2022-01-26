import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useRouter} from 'next/router';
import {
  useFetchHumanResourceDemand,
  useFetchInstituteHumanResourceDemands,
} from '../../../services/IndustryManagement/hooks';
import {Chip, Typography} from '@mui/material';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React, {useMemo} from 'react';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

const JobRequirementManagePage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const router = useRouter();
  const {hrDemandId} = router.query;

  const {
    data: humanResourceDemandData,
    isLoadingHumanResourceDemand,
    mutate: mutateHumanResourceDemandData,
  } = useFetchHumanResourceDemand(Number(hrDemandId));

  const {
    data: instituteHumanResourceDemandData,
    isLoadingInstituteHRDemandsData,
    mutate: mutateInstituteHRDemands,
  } = useFetchInstituteHumanResourceDemands({hr_demand_id: Number(hrDemandId)});

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
          let step = '';
          let btnColor: any = undefined;

          if (
            data?.rejected_by_institute == 0 &&
            data?.vacancy_provided_by_institute == 0
          ) {
            step = 'Pending';
            btnColor = 'primary';
          } else if (data?.vacancy_approved_by_industry_association) {
            step = 'Rejected';
            btnColor = 'error';
          } else {
            step = 'Approved';
            btnColor = 'success';
          }
          return (
            <Chip
              variant={'filled'}
              color={btnColor ?? 'default'}
              label={step}
            />
          );
        },
      },
      {
        Header: messages['job_requirement.industry_association_step'],
        accessor: 'rejected_by_industry_association',
        Cell: (props: any) => {
          let data = props.row.original;
          let step = '';
          let btnColor: any = undefined;

          if (
            data?.rejected_by_industry_association == 0 &&
            data?.vacancy_approved_by_industry_association == 0
          ) {
            step = 'Pending';
            btnColor = 'primary';
          } else if (data?.rejected_by_industry_association) {
            step = 'Rejected';
            btnColor = 'error';
          } else {
            step = 'Approved';
            btnColor = 'success';
          }
          return (
            <Chip
              variant={'filled'}
              color={btnColor ?? 'default'}
              label={step}
            />
          );
        },
      },

      {
        Header: messages['common.vacancy_approved_by_industry_association'],
        accessor: 'vacancy_approved_by_industry_association',
      },
      {
        Header: messages['common.vacancy_provided_by_institute'],
        accessor: 'vacancy_provided_by_institute',
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
    ],
    [messages],
  );
  return (
    <>
      <Typography variant={'h2'}>
        {humanResourceDemandData?.organization_title}
      </Typography>

      <ReactTable
        columns={columns}
        data={instituteHumanResourceDemandData || []}
        loading={isLoadingInstituteHRDemandsData}
        skipDefaultFilter={true}
      />
    </>
  );
};

export default JobRequirementManagePage;
