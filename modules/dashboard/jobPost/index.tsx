import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';
import {Paper, Step, StepLabel, Stepper} from '@mui/material';
import {styled} from '@mui/material/styles';
import PrimaryJobInformation from './steps/PrimaryJobInformation';

const StyledPaper = styled(Paper)(({theme}) => ({
  padding: 15,
  '& .MuiStepLabel-iconContainer .Mui-active': {
    fontSize: '2.3rem',
    marginTop: '-7px',
    transition: 'all 100ms ease 100ms',
  },
  '& .Mui-completed .MuiStepConnector-line': {
    borderColor: theme.palette.primary.main,
    borderTopWidth: '2px',
  },
  '& .MuiStepIcon-text': {
    fontSize: '1rem',
  },
}));

interface StepObj {
  id: number;
  langKey: string;
}

const steps: Array<StepObj> = [
  {
    id: 1,
    langKey: 'job_posting.primary_job_info',
  },
  {
    id: 2,
    langKey: 'job_posting.more_job_info',
  },
  {
    id: 3,
    langKey: 'job_posting.candidate_requirement',
  },
  {
    id: 4,
    langKey: 'job_posting.company_info_visibility',
  },
  {
    id: 5,
    langKey: 'job_posting.matching_criteria',
  },
  {
    id: 6,
    langKey: 'job_posting.billing_and_contract_info',
  },
  {
    id: 7,
    langKey: 'job_posting.preview',
  },
  {
    id: 8,
    langKey: 'job_posting.complete',
  },
];

const stepNames: Array<string> = [
  'step1',
  'step2',
  'step3',
  'step4',
  'step5',
  'step6',
  'step7',
  'step8',
];

const JobPostingView = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {postStep, jobId} = router.query;
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedSteps] = useState<any>([1, 2, 3, 4, 5]);

  console.log('step', postStep);
  console.log('jobId', jobId);

  useEffect(() => {
    if (postStep && jobId && stepNames.includes(postStep.toString())) {
      const step = postStep.toString();
      const regex = new RegExp('step(.*)');
      const match = step.match(regex);
      if (match) setActiveStep(Number(match[1]));
    }
  }, [postStep, jobId]);

  const handleNext = () => {
    router
      .push({
        pathname: '/job-post/step' + (activeStep + 1),
        query: {
          jobId: jobId,
        },
      })
      .then(() => {});
  };

  const handleBack = () => {
    router
      .push({
        pathname: '/job-post/step' + (activeStep - 1),
        query: {
          jobId: jobId,
        },
      })
      .then(() => {});
  };

  const gotoStep = (step: number) => {
    router
      .push({
        pathname: '/job-post/step' + step,
        query: {
          jobId: jobId,
        },
      })
      .then(() => {});
  };

  const getCurrentStepForm = useCallback(() => {
    switch (activeStep) {
      case 1:
        return <PrimaryJobInformation onContinue={handleNext} />;
      default:
        return <></>;
    }
  }, [activeStep]);

  const onStepIconClick = (step: number) => {
    if (completedSteps.includes(step)) {
      console.log('step', step);
      gotoStep(step);
    }
  };

  return (
    <StyledPaper>
      <Stepper activeStep={activeStep - 1} alternativeLabel>
        {steps.map((step: StepObj) => {
          const stepProps: {completed?: boolean} = {
            completed: completedSteps.includes(step.id),
          };

          const labelProps: {
            optional?: React.ReactNode;
            StepIconProps?: any;
          } = {
            StepIconProps: {
              sx: {
                cursor: 'pointer',
              },
              onClick: () => {
                onStepIconClick(step.id);
              },
            },
          };

          return (
            <Step key={'key' + step.id} {...stepProps}>
              <StepLabel {...labelProps}>{messages[step.langKey]}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <React.Fragment>{getCurrentStepForm()}</React.Fragment>
    </StyledPaper>
  );
};

export default JobPostingView;
