import React, {FC, useCallback, useState} from 'react';
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
  candidateStepScheduleHireInvite,
  candidateStepScheduleUnassign,
  hiredCandidateUpdate,
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
import CandidateCvPopup from './CandidateCvPopup';
import AssignSchedulePopup from './AssignSchedule';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import MarksAsInterviewedFromPopup from './MarksAsInterviewedFromPopup';

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
  const [isOpenCvDetailsModal, setIsOpenCvDetailsModal] = useState(false);
  const [openAssignSchedulePopup, setOpenAssignSchedulePopup] = useState(false);
  const [openMarkAsInterviewedPopup, setOpenMarkAsInterviewedPopup] =
    useState(false);
  const [candidateIds, setCandidateIds] = useState<any>();
  const [candidateId, setCandidateId] = useState<any>();

  const {createSuccessMessage} = useSuccessMessage();

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
      processServerSideErrors({error, errorStack});
    }
  };

  // const hireInviteCandidate = async (itemId: number, params: any) => {
  //   try {
  //     let response = await candidateStepScheduleHireInvite(itemId, params);
  //     if (isResponseSuccess(response)) {
  //       successStack(
  //         <IntlMessages
  //           id='common.subject_updated_successfully'
  //           values={{
  //             subject: <IntlMessages id='common.hire_invite_candidates' />,
  //           }}
  //         />,
  //       );
  //     }
  //     mutateCandidates();
  //   } catch (error: any) {
  //     processServerSideErrors({error, errorStack});
  //   }
  // };

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
      processServerSideErrors({error, errorStack});
    }
  };

  // const candidateScheduleAssign = async (itemId: number) => {
  //   let params = {};
  //   try {
  //     let response = await candidateStepScheduleAssign(itemId, params);
  //     if (isResponseSuccess(response)) {
  //       successStack(
  //         <IntlMessages
  //           id='common.subject_updated_successfully'
  //           values={{
  //             subject: <IntlMessages id='common.interview_schedule' />,
  //           }}
  //         />,
  //       );
  //     }
  //     mutateCandidates();
  //   } catch (error: any) {
  //     processServerSideErrors({error, errorStack});
  //   }
  // };

  const onClickCandidateScheduleAssignButton = useCallback(
    (candidateId: any) => {
      setOpenAssignSchedulePopup(true);
      let data: any = [];
      data = [candidateId, ...data];
      setCandidateIds(data);
    },
    [candidateIds],
  );

  const onClickCandidateScheduleUnassignButton = useCallback(
    async (candidates: any) => {
      let candidateIds = [candidates?.id];
      try {
        await candidateStepScheduleUnassign(
          candidates?.candidate_interviews_interview_schedule_id,
          {applied_job_ids: candidateIds},
        );
        createSuccessMessage('common.interview_schedule_unassigned');
        mutateCandidates();
      } catch (error: any) {
        processServerSideErrors({
          error,
          errorStack,
        });
      }
    },
    [candidateIds],
  );

  const onClickCandidateScheduleInviteButton = useCallback(
    async (applicationId: any) => {
      let hireInviteType = 3;
      try {
        await candidateStepScheduleHireInvite(applicationId, {
          hire_invite_type: hireInviteType,
        });
        createSuccessMessage('common.interview_schedule_hire_invite');
        mutateCandidates();
      } catch (error: any) {
        processServerSideErrors({
          error,
          errorStack,
        });
      }
    },
    [candidateIds],
  );

  const onClickMarkAsInterviewButton = useCallback(
    async (applicationId: any) => {
      setOpenMarkAsInterviewedPopup(true);
      setCandidateId(applicationId);
    },
    [candidateIds],
  );

  const onCloseSchedulePopup = () => {
    setOpenAssignSchedulePopup(false);
    mutateCandidates();
  };
  const onCloseMarkAsInterviewedPopup = () => {
    setOpenMarkAsInterviewedPopup(false);
    mutateCandidates();
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
      processServerSideErrors({error, errorStack});
    }
  };

  const getExperiencedDuration = useCallback((data: any) => {
    const startDate = moment(data?.start_date);
    const endDate = moment(data?.end_date);
    let durationAsMonth = endDate.diff(startDate, 'months');
    let durationAsYears = durationAsMonth / 12;
    return {month: durationAsMonth, year: Math.floor(durationAsYears)};
  }, []);

  const openCvDetailsModal = useCallback(() => {
    setIsOpenCvDetailsModal(true);
  }, []);

  const closeCvDetailsModal = useCallback(() => {
    setIsOpenCvDetailsModal(false);
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

  // TODO: Remove this function if not used in the future
  /*const getButton = () => {
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
                  onClick={() => {
                    onClickCandidateScheduleAssignButton(candidate?.id);
                  }}
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
  };*/

  const getButtons = () => {
    let pos_title: any,
      pos_onClick: any,
      neg_title: any,
      neg_onClick: any,
      neg_icon: any;
    switch (candidate?.apply_status) {
      case ApplyStatuses.APPLIED:
        pos_title = `Shortlist for ${
          nextStep ? nextStep?.title : 'final hiring'
        }`;
        pos_onClick = () => shortlistCandidate(candidate.id);
        neg_title = messages['applicationManagement.reject'] as string;
        neg_onClick = () => rejectCandidate(candidate.id);
        neg_icon = <Close />;
        break;
      case ApplyStatuses.REJECTED:
        neg_title = 'Restore';
        neg_onClick = () => restoreCandidate(candidate.id);
        neg_icon = <Refresh />;
        break;
      case ApplyStatuses.SHORTLISTED:
        if (currentStep?.step_type != RecruitmentSteps.STEP_TYPE_SHORTLIST) {
          pos_title = `Schedule for Interview`;
          pos_onClick = () => {
            onClickCandidateScheduleAssignButton(candidate?.id);
          };
        } else {
          pos_title = `Shortlist for ${
            nextStep ? nextStep?.title : 'final hiring'
          }`;
          pos_onClick = () => shortlistCandidate(candidate.id);
        }
        neg_title = messages['common.remove'];
        neg_onClick = () => removeCandidate(candidate.id);
        neg_icon = <PersonRemove />;
        break;
      case ApplyStatuses.INTERVIEW_SCHEDULED:
      case ApplyStatuses.INTERVIEW_INVITED:
        pos_title = `Mark as Interviewed`;
        pos_onClick = () => onClickMarkAsInterviewButton(candidate?.id);
        neg_title = 'Deschedule';
        neg_onClick = () => onClickCandidateScheduleUnassignButton(candidate);
        neg_icon = <PersonRemove />;
        break;
      case ApplyStatuses.INTERVIEWED:
        if (nextStep) {
          pos_title = `Shortlist for ${nextStep?.title}`;
          pos_onClick = () => shortlistCandidate(candidate.id);
        } else {
          pos_title = `Shortlist for final hiring`;
          pos_onClick = () => shortlistCandidate(candidate.id);
        }
        neg_title = messages['common.reject'];
        neg_onClick = () => rejectCandidate(candidate.id);
        neg_icon = <Close />;
        break;
      case ApplyStatuses.HIRING_LISTED:
        pos_title = `Send hire invitation`;
        // pos_onClick = () =>
        //   hireInviteCandidate(candidate.id, {
        //     hire_invite_type: candidate.hire_invite_type
        //       ? candidate.hire_invite_type
        //       : 2,
        //   });
        pos_onClick = () => onClickCandidateScheduleInviteButton(candidate.id);
        break;
      case ApplyStatuses.HIRE_INVITED:
        pos_title = 'Hire';
        pos_onClick = () => hiredCandidate(candidate.id);
        break;
      default:
        return <></>;
    }
    return (
      <Box m={'auto'}>
        <CheckButton title={pos_title} onClick={pos_onClick} />
        {neg_title && neg_onClick && neg_icon && (
          <CustomRemoveButton
            title={neg_title}
            onClick={neg_onClick}
            icon={neg_icon}
          />
        )}
      </Box>
    );
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
      candidate?.apply_status == ApplyStatuses.INTERVIEW_SCHEDULED ||
      candidate?.apply_status == ApplyStatuses.INTERVIEW_INVITED
    ) {
      if (isNotCurrentStep) {
        text =
          'Interview scheduled for ' +
          candidate?.current_recruitment_step_title;
      }
    } else if (candidate?.apply_status == ApplyStatuses.INTERVIEWED) {
      if (isNotCurrentStep) {
        text = 'Interviewed for ' + candidate?.current_recruitment_step_title;
      }
    } else if (
      candidate?.apply_status == ApplyStatuses.HIRING_LISTED ||
      candidate?.apply_status == ApplyStatuses.HIRE_INVITED
    ) {
      if (currentStep?.step_no != 99) {
        text = 'Shortlisted for hiring';
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
                <H5
                  style={{cursor: 'pointer'}}
                  color={'primary'}
                  onClick={() => {
                    openCvDetailsModal();
                  }}>
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
              (data: any) => {
                let duration = getExperiencedDuration(data);
                return (
                  <Box key={data.id}>
                    <Body2 sx={{fontWeight: 'bold'}}>{data.company_name}</Body2>
                    <Body2>
                      {data.position}{' '}
                      {duration.year && duration.year < 1 ? (
                        duration.month && duration.month > 0 ? (
                          <>
                            {'('}
                            {duration.month}
                            {'+ months)'}
                          </>
                        ) : (
                          <></>
                        )
                      ) : duration.year && duration.year > 0 ? (
                        <>
                          {'('}
                          {duration.year}
                          {'+ years)'}
                        </>
                      ) : (
                        <></>
                      )}
                    </Body2>
                  </Box>
                );
              },
            )}
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Body2>
                {candidate?.youth_profile?.total_job_experience.year == 0 &&
                candidate?.youth_profile?.total_job_experience.month == 0 ? (
                  <></>
                ) : (
                  <>
                    {candidate?.youth_profile?.total_job_experience.year}
                    {'.'}
                    {candidate?.youth_profile?.total_job_experience.month} years
                  </>
                )}
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
          {openAssignSchedulePopup && (
            <AssignSchedulePopup
              appliedCandidateIds={candidateIds}
              onClose={onCloseSchedulePopup}
              currentStep={currentStep?.id}
            />
          )}
          {openMarkAsInterviewedPopup && (
            <MarksAsInterviewedFromPopup
              appliedCandidateId={candidateId}
              onClose={onCloseMarkAsInterviewedPopup}
            />
          )}

          {isOpenCvDetailsModal && (
            <CandidateCvPopup
              key={1}
              youthData={candidate}
              onClose={closeCvDetailsModal}
            />
          )}
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default CandidateComponent;
