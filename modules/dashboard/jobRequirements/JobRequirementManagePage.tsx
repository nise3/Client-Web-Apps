import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useRouter} from 'next/router';
import {
  useFetchHumanResourceDemand,
  useFetchInstituteHumanResourceDemands,
} from '../../../services/IndustryManagement/hooks';
import {Typography} from '@mui/material';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React, {useCallback, useMemo, useState} from 'react';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ApproveButton from '../../../@softbd/elements/button/ApproveButton/ApproveButton';
import RejectButton from '../applicationManagement/RejectButton';
import {rejectHRDemand} from '../../../services/IndustryManagement/HrDemandService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import JobRequirementApproveByIndustryAssocPopUp from './ActionPages/JobRequirementApproveByIndustryAssocPopUp';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';

const JobRequirementManagePage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const router = useRouter();
  const {jobRequirementId} = router.query;

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenApproveModal, setIsOpenApproveModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const openApproveModal = useCallback((itemId: number | null = null) => {
    setIsOpenApproveModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeApproveModal = useCallback(() => {
    setIsOpenApproveModal(false);
    setSelectedItemId(null);
  }, []);

  const {data: humanResourceDemandData} = useFetchHumanResourceDemand(
    Number(jobRequirementId),
  );

  const {
    data: instituteHumanResourceDemandData,
    isLoading: isLoadingInstituteHRDemandsData,
  } = useFetchInstituteHumanResourceDemands({
    hr_demand_id: Number(jobRequirementId),
  });

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((isToggleTable: boolean) => !isToggleTable);
  }, []);

  const rejectJobRequirementDemand = async (HRDemandId: number) => {
    let response = await rejectHRDemand(HRDemandId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_rejected'
          values={{subject: <IntlMessages id='hr_demand.label' />}}
        />,
      );
      refreshDataTable();
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
        Header: messages['job_requirement.vacancy_provided_by_institute'],
        accessor: 'vacancy_provided_by_institute',
      },
      {
        Header:
          messages['job_requirement.vacancy_provided_by_industry_association'],
        accessor: 'vacancy_approved_by_industry_association',
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
            data?.vacancy_provided_by_institute > 0 &&
            !data?.rejected_by_institute &&
            data?.vacancy_approved_by_industry_association == 0 &&
            data?.rejected_by_industry_association == 0 && (
              <DatatableButtonGroup>
                <ApproveButton onClick={() => openApproveModal(data.id)} />
                <RejectButton
                  rejectAction={() => rejectJobRequirementDemand(data.id)}
                  rejectTitle={messages['common.delete_confirm'] as string}
                />
              </DatatableButtonGroup>
            )
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );
  return (
    <>
      <Typography variant={'h2'}>
        {messages['organization.label'] +
          ': ' +
          humanResourceDemandData?.organization_title}
      </Typography>

      <ReactTable
        columns={columns}
        data={instituteHumanResourceDemandData || []}
        loading={isLoadingInstituteHRDemandsData}
        skipDefaultFilter={true}
        toggleResetTable={isToggleTable}
      />
      {isOpenApproveModal && (
        <JobRequirementApproveByIndustryAssocPopUp
          itemId={selectedItemId}
          onClose={closeApproveModal}
          refreshDataTable={refreshDataTable}
        />
      )}
    </>
  );
};

export default JobRequirementManagePage;
