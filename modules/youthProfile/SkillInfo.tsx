import {Grid, Typography} from '@material-ui/core';
import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../types/AppContextPropsType';
import VerticalLine from './component/VerticalLine';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    overallInfo: {
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
      },
    },
    skillInfoVBar: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
    },

    vBar: {
      height: '30px',
      width: '2px',
      background: '#ddd',
    },
  }),
);

type SkillInfoProps = {
  icon?: any;
  text1?: string;
  text2?: string;
  vBar?: boolean;
};
const SkillInfo = ({icon, text1, text2, vBar}: SkillInfoProps) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.overallInfo}>
      <Grid item xs={2} md={2}>
        {icon}
      </Grid>
      <Grid item xs={6} md={6}>
        <Typography variant={'subtitle2'}>{text1}</Typography>
        <Typography>{text2}</Typography>
      </Grid>
      {vBar && (
        <Grid item xs={12} md={1} className={classes.skillInfoVBar}>
          <VerticalLine lineHeight={'30px'} lineWidth={'2px'} color={'#ddd'} />
        </Grid>
      )}
    </Grid>
  );
};

export default SkillInfo;
