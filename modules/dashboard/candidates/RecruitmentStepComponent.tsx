import React, {useCallback, useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Body1} from '../../../@softbd/elements/common';
import {Close, Edit, KeyboardDoubleArrowRight} from '@mui/icons-material';
import {Fab} from '@mui/material';
import {RecruitmentSteps} from './RecruitmentSteps';
import {CandidateFilterTypes} from './CandidateFilterTypes';

const PREFIX = 'RecruitmentStepComponent';

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  editIcon: `${PREFIX}-editIcon`,
  candidateStatusWrapper: `${PREFIX}-candidateStatusWrapper`,
  candidateStatus: `${PREFIX}-candidateStatus`,
  topWrapper: `${PREFIX}-topWrapper`,
  stepCircle: `${PREFIX}-stepCircle`,
  deleteIcon: `${PREFIX}-deleteIcon`,
};

const StyledBox = styled(Box)(({theme}) => ({
  display: 'inline-block',
  textAlign: 'center',
  position: 'relative',
  [`&.${classes.root}:not(:first-of-type)`]: {
    [`& .${classes.candidateStatusWrapper}`]: {
      [`&::before`]: {
        left: '42px',
      },
    },
  },
  [`& .${classes.title}`]: {
    width: '100px',
    fontSize: '1rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '2',
    lineClamp: '2',
    WebkitBoxOrient: 'vertical',
  },
  [`& .${classes.editIcon}`]: {
    alignSelf: 'center',
    cursor: 'pointer',
  },
  [`& .${classes.candidateStatusWrapper}`]: {
    position: 'absolute',
    border: '1px solid #d5d5d5',
    padding: '8px',
    marginTop: '10px',
    borderRadius: '5px',
    left: '10px',
    boxShadow: '0px 0px 6px 3px #e1e1e1',
    [`&::before`]: {
      content: '""',
      position: 'absolute',
      top: '-5px',
      border: '8px solid #fefefe',
      transform: 'rotate(45deg)',
      left: '30px',
    },
  },
  [`& .${classes.candidateStatus}`]: {
    position: 'relative',
    zIndex: '1',
    display: 'flex',
    '& .status-item': {
      whiteSpace: 'nowrap',
      display: 'flex',
      userSelect: 'none',
      cursor: 'pointer',
      '&.active': {
        color: theme.palette.secondary.main,
      },
      '&:hover': {
        color: theme.palette.secondary.main,
      },
      '&:not(:first-of-type)': {
        marginLeft: '6px',
        paddingLeft: '6px',
        borderLeft: '1px solid #9d9d9d',
      },
      '&>p': {
        fontSize: '1rem',
        lineHeight: '1',
      },
    },
  },
  [`& .${classes.topWrapper}`]: {
    height: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  [`& .${classes.stepCircle}`]: {
    position: 'relative',
    '&:hover': {
      [`& .${classes.deleteIcon}`]: {
        display: 'block',
        position: 'absolute',
        top: '-4px',
        right: '-5px',
        background: 'red',
        borderRadius: '50%',
        height: '20px',
        width: '20px',
        cursor: 'pointer',
        paddingTop: '2px',
      },
    },
    [`& .${classes.deleteIcon}`]: {
      display: 'none',
    },
  },
}));

interface RecruitmentStepComponentProps {
  activeStep: any;
  stepData: any;
  onEditClick?: () => void;
  onStepDelete?: () => void;
  onStatusChange: (statusKey: string) => void;
}

const RecruitmentStepComponent = ({
  activeStep,
  stepData,
  onEditClick,
  onStepDelete,
  onStatusChange,
}: RecruitmentStepComponentProps) => {
  const [statuses, setStatuses] = useState<any>([]);

  useEffect(() => {
    if (stepData) {
      let statusList: any = [];
      if (stepData?.step_no == 1) {
        statusList = [
          {
            key: CandidateFilterTypes.ALL,
            label: 'All',
            value: stepData?.all ? stepData?.all : '0',
            active: true,
          },
          {
            key: CandidateFilterTypes.NOT_VIEWED,
            label: 'Not Viewed',
            value: stepData?.not_viewed ? stepData?.not_viewed : '0',
            active: false,
          },
          {
            key: CandidateFilterTypes.VIEWED,
            label: 'Viewed',
            value: stepData?.viewed ? stepData?.viewed : '0',
            active: false,
          },
          {
            key: CandidateFilterTypes.REJECTED,
            label: 'Rejected',
            value: stepData?.rejected ? stepData?.rejected : '0',
            active: false,
          },
          {
            key: CandidateFilterTypes.QUALIFIED,
            label: 'Qualified',
            value: stepData?.qualified ? stepData?.qualified : '0',
            active: false,
          },
        ];
      } else if (stepData?.step_no == 99) {
        statusList = [
          {
            key: CandidateFilterTypes.HIRE_SELECTED,
            label: 'Selected',
            value: stepData?.hire_selected ? stepData?.hire_selected : '0',
            active: true,
          },
          {
            key: CandidateFilterTypes.HIRE_INVITED,
            label: 'Invited',
            value: stepData?.hire_invited ? stepData?.hire_invited : '0',
            active: false,
          },
          {
            key: CandidateFilterTypes.HIRED,
            label: 'Hired',
            value: stepData?.hired ? stepData?.hired : '0',
            active: false,
          },
        ];
      } else {
        switch (stepData?.step_type) {
          case RecruitmentSteps.STEP_TYPE_SHORTLIST:
            statusList = [
              {
                key: CandidateFilterTypes.SHORTLISTED,
                label: 'Shortlisted',
                value: stepData?.shortlisted ? stepData?.shortlisted : '0',
                active: true,
              },
              {
                key: CandidateFilterTypes.QUALIFIED,
                label: 'Qualified',
                value: stepData?.qualified ? stepData?.qualified : '0',
                active: false,
              },
            ];
            break;
          case RecruitmentSteps.STEP_TYPE_WRITTEN:
          case RecruitmentSteps.STEP_TYPE_INTERVIEW:
          case RecruitmentSteps.STEP_TYPE_ONLINE_INTERVIEW:
          case RecruitmentSteps.STEP_TYPE_OTHERS:
            statusList = [
              {
                key: CandidateFilterTypes.SHORTLISTED,
                label: 'Shortlisted',
                value: stepData?.shortlisted ? stepData?.shortlisted : '0',
                active: true,
              },
              {
                key: CandidateFilterTypes.SCHEDULED,
                label: 'Scheduled',
                value: stepData?.interview_scheduled
                  ? stepData?.interview_scheduled
                  : '0',
                active: false,
              },
              {
                key: CandidateFilterTypes.INTERVIEWED,
                label: 'Interviewed',
                value: stepData?.interviewed ? stepData?.interviewed : '0',
                active: false,
              },
              {
                key: CandidateFilterTypes.REJECTED,
                label: 'Rejected',
                value: stepData?.rejected ? stepData?.rejected : '0',
                active: false,
              },
              {
                key: CandidateFilterTypes.QUALIFIED,
                label: 'Qualified',
                value: stepData?.qualified ? stepData?.qualified : '0',
                active: false,
              },
            ];
            break;
          default:
            statusList = [];
            break;
        }
      }

      setStatuses(statusList);
    }
  }, [stepData]);

  const onStatusClick = useCallback(
    (statusKey: string) => {
      let statusList = [...statuses];
      statusList = statusList.map((status: any) => {
        status.active = status.key == statusKey;
        return status;
      });
      setStatuses(statusList);
      onStatusChange(statusKey);
    },
    [statuses],
  );

  const CriteriaItem = ({status}: any) => {
    return (
      <Box
        className={`status-item ${status.active ? 'active' : ''}`}
        onClick={() => onStatusClick(status.key)}>
        <Body1>{status.label}</Body1>
        <Body1 fontWeight={'bold'} sx={{marginLeft: '8px'}}>
          {status.value}
        </Body1>
      </Box>
    );
  };

  return (
    <StyledBox className={classes.root}>
      <Box className={classes.topWrapper}>
        <Box display={'flex'}>
          <Body1 className={classes.title} title={stepData?.title}>
            {stepData?.title}
          </Body1>
          {!stepData?.is_not_editable && onEditClick && (
            <Edit className={classes.editIcon} onClick={() => onEditClick()} />
          )}
        </Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          className={classes.stepCircle}>
          {stepData?.id && (
            <KeyboardDoubleArrowRight
              sx={{position: 'absolute', left: '-50px'}}
            />
          )}
          <Fab
            color='primary'
            aria-label='applicants'
            onClick={() => {
              if (stepData?.id) {
                onStatusClick(CandidateFilterTypes.SHORTLISTED);
              } else {
                if (stepData?.step_no == 1) {
                  onStatusClick(CandidateFilterTypes.ALL);
                } else {
                  onStatusClick(CandidateFilterTypes.HIRE_SELECTED);
                }
              }
            }}>
            {stepData?.total_candidate ? stepData?.total_candidate : '0'}
          </Fab>
          {stepData?.is_deletable && (
            <Box
              color={'error'}
              className={classes.deleteIcon}
              onClick={onStepDelete}>
              <Close sx={{fontSize: '1rem', color: 'common.white'}} />
            </Box>
          )}
        </Box>
      </Box>
      {statuses && statuses.length > 0 && (
        <Box
          display={stepData?.step_no == activeStep ? 'block' : 'none'}
          className={classes.candidateStatusWrapper}>
          <Box className={classes.candidateStatus}>
            {statuses.map((status: any, index: number) => (
              <CriteriaItem status={status} key={index} />
            ))}
          </Box>
        </Box>
      )}
    </StyledBox>
  );
};

export default RecruitmentStepComponent;
