import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';
import {Paper, Step, StepLabel, Stepper} from '@mui/material';
import {styled} from '@mui/material/styles';
import {adminDomain} from '../../../@softbd/common/constants';
import SecondStep from './SecondStep';

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

const stepNames: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];

const JobPostingView = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {completionStep, formStep, presentStep, initiativeId, taglineId} =
    router.query;
  const [activeStep, setActiveStep] = useState<number>(0);
  const [lastestStep, setLastestStep] = useState<any>(1);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (
      completionStep &&
      initiativeId &&
      presentStep &&
      stepNames.includes(Number(presentStep))
    ) {
      setActiveStep(Number(presentStep));
    } else if (presentStep) {
      setIsValid(false);
    }
  }, [completionStep, initiativeId, activeStep]);

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
          pathname: `/4ir-tagline/${taglineId}/initiatives`,
        })
        .then(() => {});
    } else {
      router
        .push({
          pathname: `/4ir-tagline/${taglineId}/initiatives/` + initiativeId,
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

  console.log('active step: ', activeStep);
  const getCurrentStepForm = useCallback(() => {
    if (initiativeId) {
      console.log(
        'inside the current step form: ',
        typeof activeStep,
        activeStep,
      );
      switch (activeStep) {
        case 2:
          return (
            <SecondStep
              fourIRProjectId={initiativeId}
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
  }, [initiativeId, activeStep]);

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
