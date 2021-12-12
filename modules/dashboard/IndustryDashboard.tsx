import React, {useMemo} from 'react';
import {Grid} from '@mui/material';
import clsx from 'clsx';
import StyledTile from '../../@softbd/Tile/StyledTile';
import {styled} from '@mui/material/styles';

const PREFIX = 'IndustryDashboard';

const classes = {
  card: `${PREFIX}-card`,
  cardColors: `${PREFIX}-cardColors`,
  cardColor1: `${PREFIX}-cardColor1`,
  cardColor2: `${PREFIX}-cardColor2`,
  cardColor3: `${PREFIX}-cardColor3`,
  cardColor4: `${PREFIX}-cardColor4`,
  cardColor5: `${PREFIX}-cardColor5`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.cardColors}`]: {
    position: 'relative',
    display: 'inline-block',
    width: 'calc((100% - 80px) / 5)',
    '&:not(:first-child)': {
      marginLeft: '20px',
    },
    '&::before, &::after': {
      content: "''",
      display: 'block',
      position: 'absolute',
      background: '#fff2',
      borderRadius: 50,
      width: 90,
      height: 90,
      left: -20,
      bottom: -30,
    },
    '&::after': {
      left: -20,
      bottom: -60,
    },
  },

  [`& .${classes.cardColor1}`]: {
    background: '#661687',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor2}`]: {
    background: '#0069BC',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor3}`]: {
    background: '#305DF7',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor4}`]: {
    background: '#FD8A4B',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor5}`]: {
    background: '#14017F',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },
}));

const IndustryDashboard = () => {
  const industryStatistics = useMemo(
    () => ({
      industry: 2415,
      employed: 652,
      unemployed: 20,
      job_vacancy: 150,
      trending_skills: 320,
    }),
    [],
  );

  return (
    <StyledGrid container>
      <Grid item xs={12}>
        <StyledTile
          className={clsx(classes.cardColors, classes.cardColor1)}
          headerNumber={industryStatistics?.industry}
          message={'common.industry'}
        />

        <StyledTile
          className={clsx(classes.cardColors, classes.cardColor2)}
          headerNumber={industryStatistics?.employed}
          message={'common.employed'}
        />

        <StyledTile
          className={clsx(classes.cardColors, classes.cardColor3)}
          headerNumber={industryStatistics?.unemployed}
          message={'common.unemployed'}
        />
        <StyledTile
          className={clsx(classes.cardColors, classes.cardColor4)}
          headerNumber={industryStatistics?.job_vacancy}
          message={'common.job_vacancy'}
        />
        <StyledTile
          className={clsx(classes.cardColors, classes.cardColor5)}
          headerNumber={industryStatistics?.trending_skills}
          message={'common.trending_skills'}
        />
      </Grid>
      <Grid item xs={12} md={7}></Grid>
      <Grid item xs={12} md={5}></Grid>
    </StyledGrid>
  );
};

export default IndustryDashboard;
