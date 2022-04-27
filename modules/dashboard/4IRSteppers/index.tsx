import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';
import {Paper, Step, StepLabel, Stepper} from '@mui/material';
import {styled} from '@mui/material/styles';
import {adminDomain} from '../../../@softbd/common/constants';
import SecondStep from './SecondStep';
import {FOUR_IR_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';

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
    langKey: 'common.4IR_projects',
  },
  {
    id: 2,
    langKey: '4IR_steps.team_and_cell',
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
    langKey: 'job_posting.contract_info',
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

const stepNames: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8'];

const JobPostingView = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {completionStep, formStep, presentStep, projectId} = router.query;
  const [activeStep, setActiveStep] = useState<number>(0);
  const [lastestStep, setLastestStep] = useState<any>(1);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    console.log('type of present stePL: ', typeof presentStep);
    console.log('type of present stePL:toString ', typeof presentStep.toString);
    if (
      completionStep &&
      projectId &&
      presentStep &&
      stepNames.includes(presentStep.toString())
    ) {
      console.log('in active step');
      setActiveStep(presentStep);
    } else if (presentStep) {
      console.log('in valid state');
      setIsValid(false);
    }
  }, [completionStep, projectId]);

  const handleNext = () => {
    gotoStep(activeStep + 1);
  };

  const handleBack = () => {
    gotoStep(activeStep - 1);
  };

  const gotoStep = (step: number) => {
    if (step == 1) {
      router
        .push({
          pathname: FOUR_IR_SERVICE_PATH,
        })
        .then(() => {});
    } else {
      router
        .push({
          pathname: FOUR_IR_SERVICE_PATH + '/' + projectId,
          query: {
            completionStep: completionStep,
            formStep: formStep,
            presentStep: step,
          },
        })
        .then(() => {});
    }
  };

  const setLatestStep = (step: number) => {
    if (activeStep > step) {
      gotoStep(step);
    }
    if (step) {
      setLastestStep(step);
    }
  };

  const getCurrentStepForm = useCallback(() => {
    if (projectId) {
      switch (activeStep) {
        case 2:
          return (
            <SecondStep
              fourIRProjectId={projectId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        default:
          return <></>;
      }
    } else {
      return <></>;
    }
  }, [activeStep]);

  const onStepIconClick = (step: number) => {
    if (step <= lastestStep) {
      gotoStep(step);
    }
  };

  if (!isValid) {
    router
      .push({
        pathname: adminDomain(),
      })
      .then(() => {});
  }

  console.log('the validity: ', isValid);

  return isValid ? (
    <StyledPaper>
      <Stepper activeStep={activeStep - 1} alternativeLabel>
        {steps.map((step: StepObj) => {
          const stepProps: {completed?: boolean} = {
            completed: step.id < lastestStep,
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
  ) : (
    <></>
  );
};

export default JobPostingView;
