import React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Body1} from '../../../@softbd/elements/common';
import {Edit, KeyboardDoubleArrowRight} from '@mui/icons-material';
import {Fab} from '@mui/material';
import {RecruitmentSteps} from './RecruitmentSteps';

const PREFIX = 'RecruitmentStepComponent';

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  editIcon: `${PREFIX}-editIcon`,
  candidateStatusWrapper: `${PREFIX}-candidateStatusWrapper`,
  candidateStatus: `${PREFIX}-candidateStatus`,
  topWrapper: `${PREFIX}-topWrapper`,
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
}));

interface RecruitmentStepComponentProps {
  activeStep: any;
  stepData: any;
  onEditClick?: () => void;
  onStepClick: () => void;
}

const RecruitmentStepComponent = ({
  activeStep,
  stepData,
  onEditClick,
  onStepClick,
}: RecruitmentStepComponentProps) => {
  const getCriteriaItem = (label: string, value: any) => {
    return (
      <Box className={'status-item'}>
        <Body1>{label}</Body1>
        <Body1 fontWeight={'bold'} sx={{marginLeft: '8px'}}>
          {value}
        </Body1>
      </Box>
    );
  };
  const getCandidateStatuses = () => {
    switch (stepData?.step_type) {
      case RecruitmentSteps.STEP_TYPE_SHORTLIST:
        return (
          <Box className={classes.candidateStatus}>
            {getCriteriaItem(
              'Shortlisted',
              stepData?.short_listed ? stepData?.short_listed : '0',
            )}{' '}
            {getCriteriaItem(
              'Qualified',
              stepData?.qualified ? stepData?.qualified : '0',
            )}
          </Box>
        );
      case RecruitmentSteps.STEP_TYPE_WRITTEN:
        return <Box className={classes.candidateStatus}>ShortList</Box>;
      case RecruitmentSteps.STEP_TYPE_INTERVIEW:
        return <Box className={classes.candidateStatus}>ShortList</Box>;
      case RecruitmentSteps.STEP_TYPE_ONLINE_INTERVIEW:
        return <Box className={classes.candidateStatus}>ShortList</Box>;
      case RecruitmentSteps.STEP_TYPE_OTHERS:
        return <Box className={classes.candidateStatus}>ShortList</Box>;
      default: {
        if (stepData?.step_no == 1)
          return (
            <Box className={classes.candidateStatus}>
              {getCriteriaItem('All', stepData?.all ? stepData?.all : '0')}
              {getCriteriaItem(
                'Not Viewed',
                stepData?.not_viewed ? stepData?.not_viewed : '0',
              )}
              {getCriteriaItem(
                'Viewed',
                stepData?.viewed ? stepData?.viewed : '0',
              )}
              {getCriteriaItem(
                'Rejected',
                stepData?.rejected ? stepData?.rejected : '0',
              )}
              {getCriteriaItem(
                'Qualified',
                stepData?.qualified ? stepData?.qualified : '0',
              )}
            </Box>
          );
        else {
          return <Box className={classes.candidateStatus} />;
        }
      }
    }
  };

  return (
    <StyledBox className={classes.root}>
      <Box className={classes.topWrapper}>
        <Box display={'flex'}>
          <Body1 className={classes.title}>{stepData?.title}</Body1>
          {!stepData?.is_not_editable && onEditClick && (
            <Edit className={classes.editIcon} onClick={() => onEditClick()} />
          )}
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          {stepData?.id && (
            <KeyboardDoubleArrowRight
              sx={{position: 'absolute', left: '-15px'}}
            />
          )}
          <Fab
            color='primary'
            aria-label='applicants'
            onClick={() => onStepClick()}>
            {stepData?.total_candidate ? stepData?.total_candidate : '0'}
          </Fab>
        </Box>
      </Box>
      <Box
        display={stepData?.step_no == activeStep ? 'block' : 'none'}
        className={classes.candidateStatusWrapper}>
        {getCandidateStatuses()}
      </Box>
    </StyledBox>
  );
};

export default RecruitmentStepComponent;
