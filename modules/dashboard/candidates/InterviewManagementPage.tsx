import React, {useState} from 'react';
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import {H4} from '../../../@softbd/elements/common';
import RecruitmentStepsViewSection from './RecruitmentStepsViewSection';
import {useFetchIndustryAssociationRecruitmentStepCandidateList} from '../../../services/IndustryManagement/hooks';
import CandidateComponent from './CandidateComponent';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import ContentWithImageSkeleton from '../../youth/profile/component/ContentWithImageSkeleton';

const StyledBox = styled(Box)(({theme}) => ({
  '& .CandidateComponent-root:not(:first-of-type)': {
    marginTop: '20px',
  },
}));

interface InterviewManagementPageProps {
  jobId: any;
}

const InterviewManagementPage = ({jobId}: InterviewManagementPageProps) => {
  const [currentStep, setCurrentStep] = useState<any>(null);
  const [nextStep, setNextStep] = useState<any>(null);
  const [candidatesFilter, setCandidatesFilter] = useState<any>(null);
  const [reloadStepData, setReloadStepData] = useState<any>(false);

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
    setReloadStepData(true);
    mutateCandidates();
    setReloadStepData(false);
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
          <H4 sx={{fontWeight: 'bold', marginBottom: '20px'}}>
            {(candidateList || []).length} candidates{' '}
          </H4>

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
            <NoDataFoundComponent />
          )}
        </React.Fragment>
      )}
    </StyledBox>
  );
};

export default InterviewManagementPage;
