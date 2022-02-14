import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {Fab, Skeleton} from '@mui/material';
import {styled} from '@mui/material/styles';
import RecruitmentStepComponent from './RecruitmentStepComponent';
import {Add} from '@mui/icons-material';
import RecruitmentStepAddEditPopup from './RecruitmentStepAddEditPopup';
import {useFetchJobRecruitmentSteps} from '../../../services/IndustryAssociationManagement/hooks';
import Tooltip from '@mui/material/Tooltip';

const PREFIX = 'RecruitmentStepsViewSection';

const classes = {
  fab: `${PREFIX}-fab`,
  applicants: `${PREFIX}-applicants`,
  button: `${PREFIX}-button`,
  buttonChild: `${PREFIX}-buttonChild`,
  edit: `${PREFIX}-edit`,
  modal: `${PREFIX}-modal`,
  recruitmentStepWrapper: `${PREFIX}-recruitmentStepWrapper`,
  recruitmentButtonWrapper: `${PREFIX}-recruitmentButtonWrapper`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.button}`]: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  [`& .${classes.buttonChild}`]: {
    display: 'flex',
    backgroundColor: '#4806487d',
    borderRadius: 5,
    padding: 8,
    fontSize: '1rem',
  },
  [`& .${classes.fab}`]: {
    backgroundColor: '#fff',
    marginTop: '10px',
  },
  [`& .${classes.applicants}`]: {
    backgroundColor: 'purple',
    padding: '10px',
    borderBottom: '1px solid #301f30',
    borderRadius: '5px 5px 0 0 ',
  },
  [`& .${classes.edit}`]: {
    cursor: 'pointer',
  },
  [`& .${classes.modal}`]: {
    color: 'red',
  },
  [`& .${classes.recruitmentStepWrapper}`]: {
    display: 'flex',
    height: '180px',
    overflow: 'auto',
  },
  [`& .${classes.recruitmentButtonWrapper}`]: {
    height: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  [`& .RecruitmentStepComponent-root:not(:first-of-type)`]: {
    marginLeft: '15px',
  },
  [`& .RecruitmentStepComponent-root:last-of-type`]: {
    float: 'right',
  },
}));

interface RecruitmentStepsViewSectionProps {
  jobId: string;
  onClickStep: (filters: any) => void;
}

const RecruitmentStepsViewSection = ({
  jobId,
  onClickStep,
}: RecruitmentStepsViewSectionProps) => {
  const [openRecruitmentAddEditPopup, setOpenRecruitmentAddEditPopup] =
    useState<boolean>(false);

  const [activeStep, setActiveStep] = useState<any>(1);
  const [recruitmentSteps, setRecruitmentSteps] = useState<any>([]);
  const [firstAndLastStepData, setFirstAndLastStepData] = useState<any>([]);
  const [selectedStep, setSelectedStep] = useState<any>(null);
  const {
    data: recruitmentData,
    isLoading,
    mutate: mutateRecruitmentSteps,
  } = useFetchJobRecruitmentSteps(jobId);

  /*const [recruitmentData] = useState<any>({
    steps: [
      {
        id: 1,
        job_id: '1',
        title: 'Call for first interview',
        title_en: null,
        step_type: 1,
        is_interview_reschedule_allowed: null,
        interview_contact: null,
        created_at: null,
        updated_at: null,
        total_candidate: 0,
        shortlisted: 0,
        rejected: 0,
        qualified: 0,
      },
      {
        id: 1,
        job_id: '1',
        title: 'Call for first interview',
        title_en: null,
        step_type: 2,
        is_interview_reschedule_allowed: null,
        interview_contact: null,
        created_at: null,
        updated_at: null,
        total_candidate: 0,
        shortlisted: 0,
        rejected: 0,
        qualified: 0,
      },
    ],
  });*/

  useEffect(() => {
    if (recruitmentData) {
      let firstAndLastStep = [
        {
          title: 'All Applicants',
          step_no: 1,
          is_not_editable: true,
          total_candidate: recruitmentData?.all_applications?.total_candidate,
          all: recruitmentData?.all_applications?.all,
          viewed: recruitmentData?.all_applications?.viewed,
          not_viewed: recruitmentData?.all_applications?.not_viewed,
          rejected: recruitmentData?.all_applications?.rejected,
          qualified: recruitmentData?.all_applications?.qualified,
        },
        {
          title: 'Final Hiring List',
          step_no: (recruitmentData?.steps || []).length + 2,
          is_not_editable: true,
          total_candidate: recruitmentData?.final_hiring_list?.total_candidate,
        },
      ];
      setFirstAndLastStepData(firstAndLastStep);

      let stepNo: number = 2;
      let steps: any = [];
      (recruitmentData?.steps || []).map((step: any) => {
        steps.push({...step, step_no: stepNo++});
      });

      setRecruitmentSteps(steps);
    }
  }, [recruitmentData]);

  const onEditClick = (stepId: any) => {
    setSelectedStep(stepId);
    setOpenRecruitmentAddEditPopup(true);
  };
  const onStepClick = (step: any) => {
    console.log('step: ', step);
    setActiveStep(step?.step_no ? step?.step_no : 1);
  };

  const closeRecruitmentAddEditPopup = () => {
    setSelectedStep(null);
    setOpenRecruitmentAddEditPopup(false);
  };

  return (
    <StyledBox>
      {isLoading ? (
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box sx={{width: '30%'}}>
            <Skeleton variant='text' width={'100%'} />
            <Skeleton variant='circular' width={60} height={60} />
          </Box>
          <Box sx={{width: '30%'}}>
            <Skeleton variant='text' width={'100%'} />
            <Skeleton variant='circular' width={60} height={60} />
          </Box>
          <Box sx={{width: '30%'}}>
            <Skeleton variant='text' width={'100%'} />
            <Skeleton variant='circular' width={60} height={60} />
          </Box>
        </Box>
      ) : (
        <Box className={classes.recruitmentStepWrapper}>
          <RecruitmentStepComponent
            activeStep={activeStep}
            onStepClick={() => onStepClick(firstAndLastStepData[0])}
            stepData={firstAndLastStepData ? firstAndLastStepData[0] : {}}
          />
          {(recruitmentSteps || []).map((step: any, index: number) => {
            return (
              <RecruitmentStepComponent
                activeStep={activeStep}
                stepData={step}
                onEditClick={() => onEditClick(step?.id)}
                onStepClick={() => onStepClick(step)}
                key={index}
              />
            );
          })}
          <Box className={classes.recruitmentButtonWrapper}>
            <Tooltip title={'Add recruitment step'} arrow>
              <Fab
                color='primary'
                aria-label='applicants'
                sx={{marginLeft: '30px', marginRight: '30px'}}
                onClick={() => {
                  setOpenRecruitmentAddEditPopup(true);
                }}>
                <Add />
              </Fab>
            </Tooltip>
          </Box>

          <RecruitmentStepComponent
            activeStep={activeStep}
            onStepClick={() => onStepClick(firstAndLastStepData[1])}
            stepData={firstAndLastStepData ? firstAndLastStepData[1] : {}}
          />
        </Box>
      )}

      {openRecruitmentAddEditPopup && (
        <RecruitmentStepAddEditPopup
          jobId={jobId}
          stepId={selectedStep}
          onClose={closeRecruitmentAddEditPopup}
          mutateSteps={mutateRecruitmentSteps}
        />
      )}
    </StyledBox>
  );
};

export default RecruitmentStepsViewSection;
