import StyledTile from '../../../@softbd/Tile/StyledTile';
import {Box, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {styled} from '@mui/material/styles';
import {IDashboardStatistics} from '../../../shared/Interface/dashboard.interface';
import {useFetchDashboardStatistics} from '../../../services/global/hooks';

const PREFIX = 'Dashboard';

const classes = {
  card: `${PREFIX}-card`,
  cardColors: `${PREFIX}-cardColors`,
  cardColor1: `${PREFIX}-cardColor1`,
  cardColor2: `${PREFIX}-cardColor2`,
  cardColor3: `${PREFIX}-cardColor3`,
  cardColor4: `${PREFIX}-cardColor4`,
  cardColor5: `${PREFIX}-cardColor5`,
  cardColor6: `${PREFIX}-cardColor6`,
  cardColor7: `${PREFIX}-cardColor7`,
};
const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.cardColors}`]: {
    position: 'relative',
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

  [`& .${classes.cardColor6}`]: {
    background: '#D169E4',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },

  [`& .${classes.cardColor7}`]: {
    background: '#22BB33',
    textAlign: 'center',
    padding: theme.spacing(1),
    color: '#fff',
  },
}));
const StyledTileSection = () => {
  const [dashStatistics, setDashStatistics] = useState<IDashboardStatistics>();
  let {data: statistics} = useFetchDashboardStatistics();

  // debugger
  useEffect(() => {
    setDashStatistics(statistics);
  }, [statistics]);

  return (
    <StyledBox>
      <Grid container className={classes.card} spacing={2}>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor1)}
            headerNumber={dashStatistics?.total_course}
            message={'dashboard.totalCourse'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor2)}
            headerNumber={dashStatistics?.total_enroll}
            message={'dashboard.totalEnroll'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor3)}
            headerNumber={dashStatistics?.total_certificate_issue}
            message={'dashboard.totalCertificateIssue'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor4)}
            headerNumber={dashStatistics?.total_trending_course}
            message={'dashboard.totalTrendingCourse'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor5)}
            headerNumber={dashStatistics?.total_demand_from_industry}
            message={'dashboard.DemandFromIndustry'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor6)}
            headerNumber={dashStatistics?.total_batch}
            message={'dashboard.totalNumberOfBatch'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor7)}
            headerNumber={dashStatistics?.total_running_students}
            message={'dashboard.RunningStudent'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor1)}
            headerNumber={dashStatistics?.total_trainers}
            message={'dashboard.NumberOfTrainer'}
          />
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default StyledTileSection;
