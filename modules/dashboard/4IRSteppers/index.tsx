import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';
import {Paper, Step, StepLabel, Stepper} from '@mui/material';
import {styled} from '@mui/material/styles';
import {adminDomain} from '../../../@softbd/common/constants';
import TeamStep from './TeamStep';
import TNAReportStep from './TNAReportStep';
import CSStep from './CSStep';
import CurriculumStep from './CurriculumStep';
import CBLMStep from './CBLMStep';
import ResourceManagementStep from './ResourceManagementStep';
import ToTStep from './ToTStep';
import FourIRCourseStep from './FourIRCourseStep';
import SkillDevelopmentStep from './SkillDevelopmentStep';
import AssessmentStep from './AssessmentStep';
import CertificationStep from './CertificationStep';
import ProjectAnalysisStep from './ProjectAnalysisStep';
import ScaleUpStep from './ScaleUpStep';
import EmploymentStep from './EmploymentStep';

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
    langKey: '4ir.project_initiative',
  },
  {
    id: 2,
    langKey: '4IR_steps.team_and_cell',
  },
  {
    id: 3,
    langKey: '4ir.TNA_report',
  },
  {
    id: 4,
    langKey: '4ir.CS',
  },
  {
    id: 5,
    langKey: 'curriculum.label',
  },
  {
    id: 6,
    langKey: '4ir.CBLM',
  },
  {
    id: 7,
    langKey: '4ir_rm.level',
  },
  {
    id: 8,
    langKey: '4ir_tot.tot',
  },
  {
    id: 9,
    langKey: 'course.label',
  },
  {
    id: 10,
    langKey: 'common.skill_develop',
  },
  {
    id: 11,
    langKey: 'assessmentManagement.assessment',
  },
  {
    id: 12,
    langKey: 'common.certifications',
  },
  {
    id: 13,
    langKey: 'employment.label',
  },
  {
    id: 14,
    langKey: '4ir_initiative_analysis.label',
  },
  {
    id: 15,
    langKey: '4ir.scale_up',
  },
];

const stepNames: Array<number> = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
];

const TeamAndCellView = () => {
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
  }, [router?.query]);

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

  const getCurrentStepForm = useCallback(() => {
    if (initiativeId) {
      switch (activeStep) {
        case 2:
          return (
            <TeamStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 3:
          return (
            <TNAReportStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 4:
          return (
            <CSStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 5:
          return (
            <CurriculumStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 6:
          return (
            <CBLMStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 7:
          return (
            <ResourceManagementStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 8:
          return (
            <ToTStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 9:
          return (
            <FourIRCourseStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );

        /*        case 10:
          return (
            <EnrollmentApprovalStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );*/

        case 10:
          return (
            <SkillDevelopmentStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );

        case 11:
          return (
            <AssessmentStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 12:
          return (
            <CertificationStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 13:
          return (
            <EmploymentStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 14:
          return (
            <ProjectAnalysisStep
              fourIRInitiativeId={initiativeId}
              onBack={handleBack}
              onContinue={handleNext}
              setLatestStep={setLatestStep}
            />
          );
        case 15:
          return (
            <ScaleUpStep
              fourIRInitiativeId={initiativeId}
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

export default TeamAndCellView;