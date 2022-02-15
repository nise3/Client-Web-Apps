import React, {useState} from 'react';
import {
  Avatar,
  Box,
  LinearProgress,
  linearProgressClasses,
  Typography,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Body1, Body2, Caption, H5} from '../../../@softbd/elements/common';
import RecruitmentStepsViewSection from './RecruitmentStepsViewSection';
import Grid from '@mui/material/Grid';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import {useIntl} from 'react-intl';
import {useFetchIndustryAssociationRecruitmentStepCandidateList} from '../../../services/IndustryManagement/hooks';
import moment from 'moment/moment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  hiredCandidateUpdate,
  hireInviteCandidateUpdate,
  rejectCandidateUpdate,
  shortlistCandidateUpdate,
} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

const PREFIX = 'InterviewManagementPage';

const classes = {
  cardHeader: `${PREFIX}-cardHeader`,
  age: `${PREFIX}-age`,
  approveButton: `${PREFIX}-approveButton`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.cardHeader}`]: {
    boxShadow: '0px 0px 5px 2px #e9e9e9',
    borderRadius: '5px',
    padding: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  [`& .${classes.age}`]: {
    border: '1px solid black',
    padding: '2px',
    borderRadius: '5px',
    paddingBottom: '0px',
  },
  [`& .${classes.approveButton}`]: {
    color: theme.palette.primary.main,
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 10,
  borderRadius: 5,
  width: '100%',
  marginRight: '10px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
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

  const {successStack, errorStack} = useNotiStack();

  const {data: candidateList, metaData} =
    useFetchIndustryAssociationRecruitmentStepCandidateList(
      jobId,
      candidatesFilter,
    );

  console.log('candidateList->', candidateList);

  const onRecruitmentStepOrFilterChange = (
    filters: any,
    currentStep: any,
    nextStep: any,
  ) => {
    // console.log('filters : ', filters, currentStep, nextStep);
    console.log('currentStep : ', currentStep);
    console.log('nextStep : ', nextStep);
    setCandidatesFilter(filters);
    setCurrentStep(currentStep);
    setNextStep(nextStep);
  };

  const rejectCandidate = async (itemId: number) => {
    try {
      let response = await rejectCandidateUpdate(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='common.reject_candidates' />}}
          />,
        );
      }
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  };

  const removeCandidate = async (itemId: number) => {
    try {
      let response = await removeCandidate(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='common.remove_candidates' />}}
          />,
        );
      }
    } catch (error: any) {
      console.log('remove err->', error);
      processServerSideErrors({error, errorStack});
    }
  };

  const hireInviteCandidate = async (itemId: number, params: any) => {
    try {
      let response = await hireInviteCandidateUpdate(itemId, params);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{
              subject: <IntlMessages id='common.hire_invite_candidates' />,
            }}
          />,
        );
      }
      metaData();
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  };

  const shortlistCandidate = async (itemId: number) => {
    try {
      let response = await shortlistCandidateUpdate(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{
              subject: <IntlMessages id='common.short_list_candidates' />,
            }}
          />,
        );
      }
      metaData();
    } catch (error: any) {
      console.log('error->', error);
      processServerSideErrors({error, errorStack});
    }
  };
  const hiredCandidate = async (itemId: number) => {
    try {
      let response = await hiredCandidateUpdate(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{
              subject: <IntlMessages id='common.short_list_candidates' />,
            }}
          />,
        );
      }
      metaData();
    } catch (error: any) {
      console.log('error->', error);
      processServerSideErrors({error, errorStack});
    }
  };

  return (
    <StyledBox>
      <RecruitmentStepsViewSection
        jobId={jobId}
        onChangeStepOrFilters={onRecruitmentStepOrFilterChange}
      />

      <Body1>{(candidateList || []).length} candidates </Body1>

      {(candidateList || []).map((candidate: any) => (
        <Box className={classes.cardHeader} key={candidate.id}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={3}>
                  <Avatar src={candidate?.youth_profile?.photo} />
                </Grid>
                <Grid item xs={9}>
                  <H5>
                    {candidate?.youth_profile?.first_name}{' '}
                    {candidate?.youth_profile?.last_name}
                    <Caption className={classes.age}>
                      {moment().diff(
                        candidate?.youth_profile?.date_of_birth.slice(0, 10),
                        'years',
                      )}
                    </Caption>
                  </H5>
                  <Body2 sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    <FmdGoodIcon />
                    {candidate?.youth_profile?.upazila_title}
                    {', '}
                    {candidate?.youth_profile?.district_title}
                    {', '} {candidate?.youth_profile?.division_title}
                  </Body2>
                  <Body2>
                    {
                      candidate?.youth_profile?.youth_educations[
                        Math.max(
                          ...candidate?.youth_profile?.youth_educations.map(
                            (o: any, index: number) => {
                              o.education_level_id;
                              return index;
                            },
                          ),
                        )
                      ].institute_name
                    }
                  </Body2>
                  <Body2>
                    {
                      candidate?.youth_profile?.youth_educations[
                        Math.max(
                          ...candidate?.youth_profile?.youth_educations.map(
                            (o: any, index: number) => {
                              o.education_level_id;
                              return index;
                            },
                          ),
                        )
                      ].exam_degree_title
                    }
                  </Body2>
                  <Box display={'flex'} alignItems={'center'}>
                    <BorderLinearProgress
                      variant='determinate'
                      value={candidate?.match_rate}
                    />
                    <Typography fontWeight={'bold'} color={'primary.main'}>
                      {candidate?.match_rate}%
                    </Typography>
                  </Box>
                  <Body2 sx={{display: 'flex', justifyContent: 'flex-start'}}>
                    <CallIcon /> {candidate?.youth_profile?.mobile}
                  </Body2>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              {(candidate?.youth_profile?.youth_job_experiences || []).map(
                (data: any) => (
                  <Box key={data.id}>
                    <Body2 sx={{fontWeight: 'bold'}}>{data.company_name}</Body2>
                    <Body2>
                      {data.position} (
                      {moment
                        .duration(
                          data.start_date
                            ? data.start_date.slice(0, 10)
                            : moment(new Date()).diff(
                                data.start_date
                                  ? data.start_date.slice(0, 10)
                                  : moment(new Date()),
                              ),
                        )
                        .asYears()}{' '}
                      {'years'})
                    </Body2>
                  </Box>
                ),
              )}
            </Grid>
            <Grid item xs={2}>
              <Box>
                <Body2>
                  {candidate?.youth_profile?.total_job_experience.year}
                  {'.'}
                  {candidate?.youth_profile?.total_job_experience.month} years
                </Body2>
                <Body2>
                  &#2547;{' '}
                  {candidate?.expected_salary
                    ? candidate?.expected_salary
                    : candidate?.youth_profile?.expected_salary
                    ? candidate?.youth_profile?.expected_salary
                    : 'N/A'}
                </Body2>
              </Box>
            </Grid>
            <Grid item xs={3}>
              {nextStep && nextStep?.step_type != 1 && (
                <>
                  <Button
                    onClick={() => console.log('common')}
                    startIcon={
                      <CalendarTodayIcon style={{marginLeft: '5px'}} />
                    }
                    color='primary'>
                    {messages['calendar.schedule'] as string}
                  </Button>

                  <Button
                    onClick={() => removeCandidate(candidate.id)}
                    startIcon={<GroupRemoveIcon style={{marginLeft: '5px'}} />}
                    color='secondary'>
                    {messages['common.remove'] as string}
                  </Button>
                </>
              )}
              {nextStep && currentStep.step_no === 1 && (
                <>
                  <Tooltip title={nextStep.title}>
                    <Button
                      onClick={() => console.log('common')}
                      startIcon={<DoneIcon style={{marginLeft: '5px'}} />}
                      color='primary'>
                      {messages['common.approve'] as string}
                    </Button>
                  </Tooltip>

                  <Tooltip title={nextStep.title}>
                    <Button
                      onClick={() => rejectCandidate(candidate.id)}
                      startIcon={
                        <DeleteForeverIcon style={{marginLeft: '5px'}} />
                      }
                      color='primary'>
                      {messages['applicationManagement.reject'] as string}
                    </Button>
                  </Tooltip>
                </>
              )}

              <Tooltip title={nextStep.title}>
                <Button
                  onClick={() => hiredCandidate(candidate.id)}
                  startIcon={<DoneIcon style={{marginLeft: '5px'}} />}
                  color='primary'>
                  {messages['common.hired_candidates'] as string}
                </Button>
              </Tooltip>

              {!nextStep &&
                currentStep.step_no !== 99 &&
                !candidate.hire_invited_at && (
                  <Tooltip title={'Short List for Next step'} arrow>
                    <Button onClick={() => shortlistCandidate(candidate.id)}>
                      Short List for Next step
                    </Button>
                  </Tooltip>
                )}

              {!nextStep &&
                currentStep.step_no !== 99 &&
                candidate.hire_invited_at && (
                  <Tooltip title={'Short List for final Hiring'} arrow>
                    <Button
                      onClick={() =>
                        hireInviteCandidate(candidate.id, {
                          hire_invite_type: candidate.hire_invite_type
                            ? candidate.hire_invite_type
                            : 2,
                        })
                      }>
                      Short List for final Hiring
                    </Button>
                  </Tooltip>
                )}

              {candidate?.hired_at && <Body2>Hired</Body2>}
              <Body2>{candidate?.current_recruitment_step_title}</Body2>
            </Grid>
          </Grid>
        </Box>
      ))}
    </StyledBox>
  );
};

export default InterviewManagementPage;
