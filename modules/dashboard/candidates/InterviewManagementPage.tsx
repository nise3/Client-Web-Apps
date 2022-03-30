import React, {useState} from 'react';
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import {H4} from '../../../@softbd/elements/common';
import RecruitmentStepsViewSection from './RecruitmentStepsViewSection';
import {useFetchIndustryAssociationRecruitmentStepCandidateList} from '../../../services/IndustryManagement/hooks';
import CandidateComponent from './CandidateComponent';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import ContentWithImageSkeleton from '../../youth/profile/component/ContentWithImageSkeleton';
import {useIntl} from 'react-intl';
import Grid from '@mui/material/Grid';
import ScheduleCreateComponentPopup from './ScheduleCreateComponent';
import Button from '@mui/material/Button';
import ScheduleListComponentPopup from './ScheduleListComponent';

const StyledBox = styled(Box)(({theme}) => ({
  '& .CandidateComponent-root:not(:first-of-type)': {
    marginTop: '20px',
  },
}));

interface InterviewManagementPageProps {
  jobId: any;
}

const InterviewManagementPage = ({jobId}: InterviewManagementPageProps) => {
  const {messages} = useIntl();

  const [currentStep, setCurrentStep] = useState<any>(null);
  const [nextStep, setNextStep] = useState<any>(null);
  const [candidatesFilter, setCandidatesFilter] = useState<any>(null);
  const [reloadStepData, setReloadStepData] = useState<any>(null);

  const [openCreateSchedulePopup, setOpenCreateSchedulePopup] =
    useState<boolean>(false);
  const [openScheduleListPopup, setOpenScheduleListPopup] =
    useState<boolean>(false);

  const closeCreateScheduleAddEditPopup = () => {
    setOpenCreateSchedulePopup(false);
  };

  const closeScheduleListPopup = () => {
    setOpenScheduleListPopup(false);
  };

  const {
    data: candidateList,
    mutate: mutateCandidates,
    isLoading,
  } = useFetchIndustryAssociationRecruitmentStepCandidateList(
    jobId,
    candidatesFilter,
  );

  const onRecruitmentStepOrFilterChange = (
    filters: any,
    currentStep: any,
    nextStep: any,
  ) => {
    setCandidatesFilter(filters);
    setCurrentStep(currentStep);
    setNextStep(nextStep);
  };

  const reloadAllData = () => {
    setReloadStepData(Math.random() * 1e9);
    mutateCandidates();
  };

  return (
    <StyledBox>
      <RecruitmentStepsViewSection
        reload={reloadStepData}
        jobId={jobId}
        onChangeStepOrFilters={onRecruitmentStepOrFilterChange}
      />

      {isLoading ? (
        <Box>
          <ContentWithImageSkeleton />
        </Box>
      ) : (
        <React.Fragment>
          <Grid container>
            <Grid item xs={6}>
              <H4 sx={{fontWeight: 'bold', marginBottom: '20px'}}>
                {(candidateList || []).length}{' '}
                {messages['common.candidates'] as string}{' '}
              </H4>
            </Grid>
            {currentStep?.step_type && currentStep?.total_candidate > 0 && (
              <Grid item xs={3}>
                <Button
                  variant='contained'
                  onClick={() => setOpenCreateSchedulePopup(true)}>
                  Create Schedule
                </Button>
                {openCreateSchedulePopup && (
                  <ScheduleCreateComponentPopup
                    jobId={jobId}
                    onClose={closeCreateScheduleAddEditPopup}
                    currentStep={currentStep}
                  />
                )}
              </Grid>
            )}
            {currentStep?.step_type && currentStep?.total_candidate > 0 && (
              <Grid item xs={3}>
                <Button
                  variant='contained'
                  onClick={() => setOpenScheduleListPopup(true)}>
                  Schedule List
                </Button>
                {openScheduleListPopup && (
                  <ScheduleListComponentPopup
                    onClose={closeScheduleListPopup}
                    jobId={jobId}
                    currentStep={currentStep}
                  />
                )}
              </Grid>
            )}
          </Grid>

          {(candidateList || []).map((candidate: any) => (
            <CandidateComponent
              candidate={candidate}
              currentStep={currentStep}
              nextStep={nextStep}
              mutateCandidates={() => reloadAllData()}
              key={candidate.id}
            />
          ))}

          {candidateList && candidateList.length == 0 && (
            <NoDataFoundComponent messageType={messages['common.candidates']} />
          )}
        </React.Fragment>
      )}
    </StyledBox>
  );
};

export default InterviewManagementPage;
