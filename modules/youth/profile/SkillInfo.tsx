import {createStyles, makeStyles} from '@mui/styles';
import React from 'react';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Box, Typography} from '@mui/material';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    overallInfo: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

type SkillInfoProps = {
  icon?: any;
  text1?: string;
  text2?: string;
};
const SkillInfo = ({icon, text1, text2}: SkillInfoProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.overallInfo}>
      <Box sx={{marginRight: 3}}>{icon}</Box>
      <Box>
        <Typography variant={'subtitle2'}>{text1}</Typography>
        <Typography>{text2}</Typography>
      </Box>
    </Box>
  );
};

export default SkillInfo;
