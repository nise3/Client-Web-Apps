import React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Body1} from '../../../@softbd/elements/common';
import {Edit} from '@mui/icons-material';
import {Fab} from '@mui/material';

const PREFIX = 'RecruitmentStepComponent';

const classes = {
  root: `${PREFIX}-root`,
  title: `${PREFIX}-title`,
  candidateStatus: `${PREFIX}-candidateStatus`,
};

const StyledBox = styled(Box)(({theme}) => ({
  display: 'inline-block',
  textAlign: 'center',
  [`& .${classes.title}`]: {
    width: '140px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  [`& .${classes.candidateStatus}`]: {},
}));

interface RecruitmentStepComponentProps {
  stepData: any;
  onEditClick: () => void;
}

const RecruitmentStepComponent = ({
  stepData,
  onEditClick,
}: RecruitmentStepComponentProps) => {
  console.log('stepData: ', stepData);

  const getCandidateStatuses = () => {
    return <Box>aaa</Box>;
  };

  return (
    <StyledBox className={classes.root}>
      <Box display={'flex'}>
        <Body1 className={classes.title}>{stepData.title}</Body1>
        {!stepData?.isNotEditable && <Edit onClick={() => onEditClick()} />}
      </Box>
      <Fab color='primary' aria-label='applicants'>
        {stepData?.total_applicants ? stepData?.total_applicants : '0'}
      </Fab>
      <Box className={classes.candidateStatus}>{getCandidateStatuses()}</Box>
    </StyledBox>
  );
};

export default RecruitmentStepComponent;
