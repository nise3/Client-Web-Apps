import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Card} from '@mui/material';

const StyledCard = styled(Card)(({theme}) => ({
  maxWidth: 345,
  minWidth: '100%',
  position: 'relative',
  height: '100%',
}));

interface JobCardComponentProps {
  job: any;
}

const JobCardComponent: FC<JobCardComponentProps> = ({job}) => {
  return <StyledCard>Text</StyledCard>;
};

export default JobCardComponent;
