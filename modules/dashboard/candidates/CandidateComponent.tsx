import React, {FC, useCallback} from 'react';
import Grid from '@mui/material/Grid';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Fab,
  LinearProgress,
  linearProgressClasses,
  Tooltip,
  Typography,
} from '@mui/material';
import {Body2, H5} from '../../../@softbd/elements/common';
import moment from 'moment/moment';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CallIcon from '@mui/icons-material/Call';
import {styled} from '@mui/material/styles';
import {
  hiredCandidateUpdate,
  hireInviteCandidateUpdate,
  rejectCandidateUpdate,
  removeCandidateUpdate,
  restoreCandidateUpdate,
  shortlistCandidateUpdate,
} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {RecruitmentSteps} from './RecruitmentSteps';
import {Check, Close, PersonRemove, Refresh} from '@mui/icons-material';
import {ApplyStatuses} from './ApplyStatuses';

const PREFIX = 'CandidateComponent';

const classes = {
  root: `${PREFIX}-root`,
  age: `${PREFIX}-age`,
  shortListButton: `${PREFIX}-shortListButton`,
  removeButton: `${PREFIX}-removeButton`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`&.${classes.root}`]: {
    border: '1px solid #f5f5f5',
  },
  [`& .${classes.age}`]: {
    border: '1px solid black',
    padding: '2px',
    borderRadius: '5px',
    paddingBottom: '0px',
  },
  [`& .${classes.shortListButton}`]: {
    backgroundColor: '#1c9f1c',
    color: theme.palette.common.white,
    marginRight: '15px',
    '&:hover': {
      backgroundColor: '#138113',
      color: theme.palette.common.white,
    },
  },
  [`& .${classes.removeButton}`]: {
    backgroundColor: '#f32020',
    color: theme.palette.common.white,
    marginRight: '15px',
    '&:hover': {
      backgroundColor: '#bb1212',
      color: theme.palette.common.white,
    },
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

interface CandidateComponentProps {
  candidate: any;
  currentStep: any;
  nextStep: any;
  mutateCandidates: any;
}

const CandidateComponent: FC<CandidateComponentProps> = ({
  candidate,
  currentStep,
  nextStep,
  mutateCandidates,
}) => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();

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
      mutateCandidates();
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  };
  const restoreCandidate = async (itemId: number) => {
    try {
      let response = await restoreCandidateUpdate(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='common.restore_candidates' />}}
          />,
        );
      }
      mutateCandidates();
    } catch (error: any) {
      processServerSideErrors({error, errorStack});
    }
  };

  const removeCandidate = async (itemId: number) => {
    try {
      let response = await removeCandidateUpdate(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='common.remove_candidates' />}}
          />,
        );
      }
      mutateCandidates();
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
      mutateCandidates();
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
      mutateCandidates();
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
      mutateCandidates();
    } catch (error: any) {
      console.log('error->', error);
      processServerSideErrors({error, errorStack});
    }
  };
  const getExperiencedDuration = useCallback((data: any) => {
    let durationAsMonth = moment
      .duration(
        data.start_date
          ? data.start_date.slice(0, 10)
          : moment(new Date()).diff(
              data.start_date
                ? data.start_date.slice(0, 10)
                : moment(new Date()),
            ),
      )
      .asMonths();
    return {month: durationAsMonth};
  }, []);
  const CheckButton = ({
    title,
    onClick,
  }: {
    title: string;
    onClick: () => void;
  }) => {
    return (
      <Tooltip title={title} arrow>
        <Fab
          size={'small'}
          className={classes.shortListButton}
          onClick={() => onClick()}>
          <Check />
        </Fab>
      </Tooltip>
    );
  };

  const CustomRemoveButton = ({
    title,
    onClick,
    icon,
  }: {
    title: string;
    onClick: () => void;
    icon: any;
  }) => {
    return (
      <Tooltip title={title} arrow>
        <Fab
          size={'small'}
          className={classes.removeButton}
          onClick={() => onClick()}>
          {icon}
        </Fab>
      </Tooltip>
    );
  };

  const getButtons = () => {
    switch (candidate?.apply_status) {
      case ApplyStatuses.APPLIED:
        return (
          <Box m={'auto'}>
            <CheckButton
              title={`Shortlist for ${
                nextStep ? nextStep?.title : 'final hiring'
              }`}
              onClick={() => shortlistCandidate(candidate.id)}
            />

            <CustomRemoveButton
              title={messages['applicationManagement.reject'] as string}
              onClick={() => rejectCandidate(candidate.id)}
              icon={<Close />}
            />
          </Box>
        );
      case ApplyStatuses.REJECTED:
        return (
          <Box m={'auto'}>
            <CustomRemoveButton
              title={'Restore'}
              onClick={() => restoreCandidate(candidate.id)}
              icon={<Refresh />}
            />
          </Box>
        );
      case ApplyStatuses.SHORTLISTED:
        return (
          <Box m={'auto'}>
            {currentStep?.step_type != RecruitmentSteps.STEP_TYPE_SHORTLIST ? (
              nextStep ? (
                <CheckButton
                  title={`Schedule for ${nextStep?.title}`}
                  onClick={() => {}}
                />
              ) : (
                <CheckButton
                  title={`Shortlist for final hiring`}
                  onClick={() => shortlistCandidate(candidate.id)}
                />
              )
            ) : (
              <CheckButton
                title={`Shortlist for ${
                  nextStep ? nextStep?.title : 'final hiring'
                }`}
                onClick={() => shortlistCandidate(candidate.id)}
              />
            )}

            <CustomRemoveButton
              title={messages['common.remove'] as string}
              onClick={() => removeCandidate(candidate.id)}
              icon={<PersonRemove />}
            />
          </Box>
        );
      case ApplyStatuses.HIRING_LISTED:
        if (candidate.hire_invited_at)
          return (
            <Box m={'auto'}>
              <CheckButton
                title={'Hire'}
                onClick={() => hiredCandidate(candidate.id)}
              />
            </Box>
          );
        return (
          <Box m={'auto'}>
            <CheckButton
              title={`Send hire invitation`}
              onClick={() =>
                hireInviteCandidate(candidate.id, {
                  hire_invite_type: candidate.hire_invite_type
                    ? candidate.hire_invite_type
                    : 2,
                })
              }
            />
          </Box>
        );
      case ApplyStatuses.HIRE_INVITED:
        return (
          <Box m={'auto'}>
            <CheckButton
              title={'Hire'}
              onClick={() => hiredCandidate(candidate.id)}
            />
          </Box>
        );
      default:
        return <></>;
    }
  };

  const getText = () => {
    let text = '';

    let isNotCurrentStep =
      candidate?.current_recruitment_step_id != null &&
      currentStep?.id != candidate?.current_recruitment_step_id;

    if (candidate?.apply_status == ApplyStatuses.REJECTED) {
      if (isNotCurrentStep) {
        text = 'Rejected for ' + candidate?.current_recruitment_step_title;
      }
    } else if (candidate?.apply_status == ApplyStatuses.SHORTLISTED) {
      if (isNotCurrentStep) {
        text = 'Shortlisted for ' + candidate?.current_recruitment_step_title;
      }
    } else if (
      candidate?.apply_status == ApplyStatuses.HIRING_LISTED ||
      candidate?.apply_status == ApplyStatuses.HIRE_INVITED
    ) {
      if (currentStep?.step_no != 99) {
        text = 'Sortlisted for hired';
      }
    } else if (candidate?.apply_status == ApplyStatuses.HIRED) {
      text = 'Hired';
    }

    return text;
  };

  return (
    <StyledCard className={classes.root}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Grid container>
              <Grid item xs={3}>
                <Avatar
                  src={candidate?.youth_profile?.photo}
                  sx={{height: '60px', width: '60px'}}
                />
              </Grid>
              <Grid item xs={9}>
                <H5 style={{cursor: 'pointer'}} color={'primary'}>
                  {candidate?.youth_profile?.first_name}{' '}
                  {candidate?.youth_profile?.last_name}
                  {/*  <Caption className={classes.age}>
                    {moment().diff(
                      candidate?.youth_profile?.date_of_birth.slice(0, 10),
                      'years',
                    )}
                  </Caption>*/}
                </H5>
                <Body2 sx={{display: 'flex', justifyContent: 'flex-start'}}>
                  <FmdGoodIcon
                    sx={{
                      fontSize: '1rem',
                      marginTop: '2px',
                      marginRight: '2px',
                    }}
                  />
                  {candidate?.youth_profile?.upazila_title ? (
                    <>
                      {candidate?.youth_profile?.upazila_title}
                      {', '}
                    </>
                  ) : (
                    <></>
                  )}
                  {candidate?.youth_profile?.district_title ? (
                    <>
                      {candidate?.youth_profile?.district_title}
                      {', '}
                    </>
                  ) : (
                    <></>
                  )}
                  {candidate?.youth_profile?.division_title ? (
                    <>{candidate?.youth_profile?.division_title}</>
                  ) : (
                    <></>
                  )}
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
                  <CallIcon
                    sx={{
                      fontSize: '1rem',
                      marginTop: '2px',
                      marginRight: '2px',
                    }}
                  />{' '}
                  {candidate?.youth_profile?.mobile}
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
                    {data.position} ({getExperiencedDuration(data).month}{' '}
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
          <Grid item xs={3} alignItems={'center'}>
            <Box display={'flex'} height={'100%'}>
              {getText() ? (
                <Body2 sx={{margin: 'auto'}}>{getText()}</Body2>
              ) : (
                getButtons()
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default CandidateComponent;
