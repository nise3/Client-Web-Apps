import {styled} from '@mui/material/styles';
import {Box, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {ICertificateAuthorityDashboardStatistics} from '../../../shared/Interface/dashboard.interface';
import {useFetchCertificationAuthorityDashboardStatistics} from '../../../services/global/hooks';
import StyledTile from '../../../@softbd/Tile/StyledTile';
import clsx from 'clsx';

const PREFIX = 'CertificateAuthorityDashboard';

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
}));

const CertificateAuthorityDashboard = () => {
  const [dashStatistics, setDashStatistics] =
    useState<ICertificateAuthorityDashboardStatistics>();
  let {data: statistics} = useFetchCertificationAuthorityDashboardStatistics();

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
            headerNumber={dashStatistics?.total_rpl_batches}
            message={'dashboard.total_rpl_batches'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor2)}
            headerNumber={dashStatistics?.total_provided_certificates}
            message={'dashboard.total_provided_certificates'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor3)}
            headerNumber={dashStatistics?.total_rtos}
            message={'dashboard.total_rtos'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor4)}
            headerNumber={dashStatistics?.total_sectors}
            message={'dashboard.total_sectors'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor5)}
            headerNumber={dashStatistics?.total_occupations}
            message={'dashboard.total_occupations'}
          />
        </Grid>
        <Grid item md={3} sm={3}>
          <StyledTile
            className={clsx(classes.cardColors, classes.cardColor6)}
            headerNumber={dashStatistics?.total_trainers}
            message={'dashboard.total_trainers'}
          />
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default CertificateAuthorityDashboard;
