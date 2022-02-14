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
import RejectButton from '../applicationManagement/RejectButton';
import moment from 'moment/moment';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import Button from '@mui/material/Button';

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

  const {data: candidateList} =
    useFetchIndustryAssociationRecruitmentStepCandidateList(
      jobId,
      candidatesFilter,
    );

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
                  <CommonButton
                    onClick={() => console.log('common')}
                    btnText='calendar.schedule'
                    startIcon={
                      <CalendarTodayIcon style={{marginLeft: '5px'}} />
                    }
                    color='primary'
                  />
                  <CommonButton
                    onClick={() => console.log('common')}
                    btnText='common.remove'
                    startIcon={<GroupRemoveIcon style={{marginLeft: '5px'}} />}
                    color='secondary'
                  />
                </>
              )}
              {nextStep && currentStep.step_no === 1 && (
                <>
                  <Tooltip title={nextStep.title}>
                    <CommonButton
                      onClick={() => console.log('common')}
                      btnText='common.approve'
                      startIcon={<DoneIcon style={{marginLeft: '5px'}} />}
                      color='primary'
                    />
                  </Tooltip>
                  <RejectButton
                    rejectAction={() => console.log('dfad')}
                    rejectTitle={messages['common.delete_confirm'] as string}
                  />
                </>
              )}
              {!nextStep && currentStep.step_no !== 99 && (
                <Tooltip title={'Call for final hiring'} arrow>
                  <Button onClick={() => console.log('common')}>
                    adsfadsfsd
                  </Button>
                </Tooltip>
              )}
            </Grid>
          </Grid>
        </Box>
      ))}
    </StyledBox>
  );
};

export default InterviewManagementPage;
