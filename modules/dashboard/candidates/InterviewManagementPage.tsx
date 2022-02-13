import React from 'react';
import {Box} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Body1} from '../../../@softbd/elements/common';
import RecruitmentStepsViewSection from './RecruitmentStepsViewSection';

const StyledBox = styled(Box)(({theme}) => ({}));

interface InterviewManagementPageProps {
  jobId: any;
}

const InterviewManagementPage = ({jobId}: InterviewManagementPageProps) => {
  console.log('InterviewManagementPage: ', jobId);

  const onRecruitmentStepChange = (filters: any) => {};

  return (
    <StyledBox>
      <RecruitmentStepsViewSection
        jobId={jobId}
        onClickStep={onRecruitmentStepChange}
      />

      <Body1>57 candidates </Body1>

      <Box>Caondidate List here</Box>
    </StyledBox>
  );
};

export default InterviewManagementPage;
