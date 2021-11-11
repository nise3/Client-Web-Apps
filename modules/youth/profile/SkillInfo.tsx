import {createStyles, makeStyles} from '@mui/styles';
import { styled } from '@mui/material/styles';
import React from 'react';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {Box, Typography} from '@mui/material';

const PREFIX = 'SkillInfo';

const classes = {
  overallInfo: `${PREFIX}-overallInfo`
};

const StyledBox = styled(Box)((
  {
    theme: CremaTheme
  }
) => ({
  [`&.${classes.overallInfo}`]: {
    display: 'flex',
    alignItems: 'center',
  }
}));

type SkillInfoProps = {
  icon?: any;
  text1?: string;
  text2?: string;
};
const SkillInfo = ({icon, text1, text2}: SkillInfoProps) => {


  return (
    <StyledBox className={classes.overallInfo}>
      <Box sx={{marginRight: 3}}>{icon}</Box>
      <Box>
        <Typography variant={'subtitle2'}>{text1}</Typography>
        <Typography>{text2}</Typography>
      </Box>
    </StyledBox>
  );
};

export default SkillInfo;
