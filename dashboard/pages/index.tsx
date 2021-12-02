import PageMeta from '../../@crema/core/PageMeta';
import DashboardPage from '../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';
import StyledTileSection from '../../modules/dashboard/StyledTileSection';
import Grid from '@mui/material/Grid';
import {styled} from '@mui/material';
import MostDemandableCourseChart from '../../modules/dashboard/charts/barChartMostDemandableCourse';
import JobTrandsChart from '../../modules/dashboard/charts/jobTrandeChart';
import BangladeshMap from '../../modules/dashboard/Map/map.bangladesh';
import {Box} from '@mui/system';
import EventMiniCalendarView from '../../modules/events/EventMiniCalendarView';

const PREFIX = 'Dashboard';

const classes = {
  // searchBox: `${PREFIX}-searchBox`,
  // searchInputBorderHide: `${PREFIX}-searchInputBorderHide`,
  // searchButton: `${PREFIX}-searchButton`,
  // list: `${PREFIX}-list`,
  // notificationBox: `${PREFIX}-notificationBox`,
  card: `${PREFIX}-card`,
};

const StyledBox = styled(Box)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20
}));

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.dashboard'] as string} />

      <StyledTileSection/>

      <StyledBox>
        <Grid container className={classes.card} spacing={2}>
          <Grid item md={7} sm={7}>
            <MostDemandableCourseChart/>
          </Grid>
          <Grid item md={5} sm={5}>
            <EventMiniCalendarView/>
            {/*<EventCalendarView views={['month']}/>*/}
          </Grid>
          <Grid item md={7} sm={7}>
            <JobTrandsChart/>
          </Grid>
          <Grid item md={5} sm={5}>
            <BangladeshMap/>
          </Grid>
        </Grid>
        {/*<Grid container className={classes.card}>*/}
        {/*  <Grid item md={7} sm={7}>*/}
        {/*    <JobTrandsChart/>*/}
        {/*  </Grid>*/}
        {/*  <Grid item md={5} sm={5}>*/}
        {/*    <BangladeshMap/>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </StyledBox>
      {/*<StyledBox>*/}
      {/*  <Grid container className={classes.card} spacing={2}>*/}
      {/*    <Grid item md={7} sm={7}>*/}
      {/*      <MostDemandableCourseChart/>*/}
      {/*    </Grid>*/}
      {/*    <Grid item md={5} sm={5}>*/}
      {/*        <DashboardSmallCalendar/>*/}
      {/*    </Grid>*/}
      {/*    <Grid item md={8} sm={8}>*/}
      {/*      <JobTrandsChart/>*/}
      {/*    </Grid>*/}
      {/*    <Grid item md={4} sm={4}>*/}
      {/*      <BangladeshMap/>*/}
      {/*    </Grid>*/}

      {/*  </Grid>*/}
      {/*</StyledBox>*/}
    </>
  );
});
