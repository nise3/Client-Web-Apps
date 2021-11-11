import {styled} from '@mui/material/styles';
import React from 'react';
import {Box, Typography} from '@mui/material';

const StyledBox = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
}));

type SkillInfoProps = {
  icon?: any;
  text1?: string;
  text2?: string;
};
const SkillInfo = ({icon, text1, text2}: SkillInfoProps) => {
  return (
    <StyledBox>
      <Box sx={{marginRight: 3}}>{icon}</Box>
      <Box>
        <Typography variant={'subtitle2'}>{text1}</Typography>
        <Typography>{text2}</Typography>
      </Box>
    </StyledBox>
  );
};

export default SkillInfo;
