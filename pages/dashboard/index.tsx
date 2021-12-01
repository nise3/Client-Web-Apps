import PageMeta from '../../@crema/core/PageMeta';
import DashboardPage from '../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';
import StyledTileSection from '../../modules/dashboard/StyledTileSection';
import Grid from '@mui/material/Grid';
import {Card, Container, styled} from '@mui/material';
import MostDemandableCourseChart from '../../modules/dashboard/charts/barChartMostDemandableCourse';
import JobTrandsChart from '../../modules/dashboard/charts/jobTrandeChart';
import DashboardSmallCalendar from '../../modules/dashboard/events/DashboardSmallCalendar';
import BangladeshMap from '../../modules/dashboard/Map/map.bangladesh';

const PREFIX = 'Dashboard';

const classes = {
  // searchBox: `${PREFIX}-searchBox`,
  // searchInputBorderHide: `${PREFIX}-searchInputBorderHide`,
  // searchButton: `${PREFIX}-searchButton`,
  // list: `${PREFIX}-list`,
  // notificationBox: `${PREFIX}-notificationBox`,
  card: `${PREFIX}-card`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,


  // [`& .${classes.searchBox}`]: {
  //   padding: '10px 5px 5px',
  //   alignItems: 'center',
  //   marginTop: 10,
  // },
  //
  // [`& .${classes.searchInputBorderHide}`]: {
  //   '& fieldset': {
  //     border: 'none',
  //   },
  //   '& input': {
  //     padding: '14px 0px',
  //   },
  // },
  //
  // [`& .${classes.searchButton}`]: {
  //   color: '#fff',
  //   padding: '8px 14px',
  //   width: '95%',
  // },
  //
  // [`& .${classes.list}`]: {
  //   paddingTop: 0,
  //   paddingBottom: 0,
  // },
  //
  // [`& .${classes.notificationBox}`]: {
  //   marginTop: 20,
  // },

  [`& .${classes.card}`]: {
    margin: 10,
  },
}));

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.dashboard'] as string} />
      {/*<H1>Dashboard</H1>*/}

      <StyledTileSection/>

      <StyledContainer maxWidth='lg'>
        <Grid container className={classes.card} spacing={2}>
          <Grid item md={6} sm={6}>
            <MostDemandableCourseChart/>
          </Grid>
          <Grid item md={6} sm={6}>
              <DashboardSmallCalendar/>
          </Grid>
          <Grid item md={6} sm={6}>
            <JobTrandsChart/>
          </Grid>
          <Grid item md={6} sm={6}>
            <BangladeshMap/>
          </Grid>

        </Grid>
      </StyledContainer>
    </>
  );
});
