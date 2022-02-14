import React from 'react';
import {Grid} from '@mui/material';
import clsx from 'clsx';
import StyledTile from '../../../@softbd/Tile/StyledTile';
import {styled} from '@mui/material/styles';
import IndustryOneMonthStatisticsChart from './IndustryOneMonthStatisticsChart';
import SectorBasedPeopleChart from './SectorBasedPeopleChart';
import DashboardTabView from './DashboardTabView';
import {useFetchIndustryAssociationDashboardStatics} from '../../../services/IndustryAssociationManagement/hooks';

const PREFIX = 'IndustryDashboard';

const classes = {
  card: `${PREFIX}-card`,
  cardColors: `${PREFIX}-cardColors`,
  cardColor1: `${PREFIX}-cardColor1`,
  cardColor2: `${PREFIX}-cardColor2`,
  cardColor3: `${PREFIX}-cardColor3`,
  cardColor4: `${PREFIX}-cardColor4`,
  cardColor5: `${PREFIX}-cardColor5`,
  mapStyle: `${PREFIX}-mapStyle`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`& .${classes.cardColors}`]: {
    position: 'relative',
    display: 'inline-block',
    width: 'calc((100% - 80px) / 5)',
    '&:not(:first-of-type)': {
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
  [`& .${classes.mapStyle}`]: {
    height: '100%',
    objectFit: 'unset',
    maxHeight: '500px',
    margin: 'auto',
  },
}));

const IndustryDashboard = () => {
  const {data: industryStatistics} =
    useFetchIndustryAssociationDashboardStatics();

  return (
    <StyledGrid container spacing={3}>
      <Grid item xs={12}>
        <StyledTile
          className={clsx(classes.cardColors, classes.cardColor1)}
          headerNumber={industryStatistics?.organizations}
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
          headerNumber={industryStatistics?.vacancies}
          message={'common.job_vacancy'}
        />
        <StyledTile
          className={clsx(classes.cardColors, classes.cardColor5)}
          headerNumber={industryStatistics?.trending_skills}
          message={'common.trending_skills'}
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <IndustryOneMonthStatisticsChart />
          </Grid>
          <Grid item xs={12}>
            <SectorBasedPeopleChart />
          </Grid>
        </Grid>
      </Grid>
      {/*<Grid item xs={12} md={5}>*/}
      {/*  <Card*/}
      {/*    sx={{*/}
      {/*      height: '100%',*/}
      {/*    }}>*/}
      {/*    <CardHeader title={messages['common.district_map']} />*/}
      {/*    <CardContent*/}
      {/*      sx={{*/}
      {/*        height: '100%',*/}
      {/*        display: 'flex',*/}
      {/*      }}>*/}
      {/*      <CardMedia*/}
      {/*        component={'img'}*/}
      {/*        image={'/images/district_map.png'}*/}
      {/*        className={classes.mapStyle}*/}
      {/*      />*/}
      {/*    </CardContent>*/}
      {/*  </Card>*/}
      {/*</Grid>*/}
      <Grid item xs={12} sx={{paddingBottom: '18px'}}>
        <DashboardTabView />
      </Grid>
    </StyledGrid>
  );
};

export default IndustryDashboard;
