import {styled} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {IRtoDashboardStatistics} from '../../../shared/Interface/dashboard.interface';
import {useFetchRTODashboardStatistics} from '../../../services/global/hooks';
import StyledTile from '../../../@softbd/Tile/StyledTile';
import clsx from 'clsx';

const PREFIX = 'RtoAuthorityDashboard';

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
    height: '100%',
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
}));

const RtoAuthorityDashboard = () => {
  const [dashStatistics, setDashStatistics] =
    useState<IRtoDashboardStatistics>();
  let {data: statistics} = useFetchRTODashboardStatistics();

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
            headerNumber={dashStatistics?.total_batches}
            message={'dashboard.total_batches'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor2)}
            headerNumber={dashStatistics?.total_rpl_applications}
            message={'dashboard.total_rpl_applications'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor3)}
            headerNumber={dashStatistics?.total_youths}
            message={'dashboard.total_youths'}
          />
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default RtoAuthorityDashboard;
