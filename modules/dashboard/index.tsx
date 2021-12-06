import React from 'react';
import StyledTileSection from './StyledTileSection';
import Grid from '@mui/material/Grid';
import MostDemandableCourseChart from './charts/barChartMostDemandableCourse';
import EventMiniCalendarView from '../events/EventMiniCalendarView';
import JobTrandsChart from './charts/jobTrandeChart';
import BangladeshMap from './Map/map.bangladesh';
import {styled} from '@mui/material';
import {Box} from '@mui/system';

const PREFIX = 'Dashboard';

const classes = {
  card: `${PREFIX}-card`,
};

const StyledBox = styled(Box)(({theme}) => ({
  marginTop: 20,
  marginBottom: 20,
}));

const Dashboard = () => {

  return (
    <>
      <StyledTileSection />

      <StyledBox>
        <Grid container className={classes.card} spacing={2}>
          <Grid item md={7} sm={7}>
            <MostDemandableCourseChart />
          </Grid>
          <Grid item md={5} sm={5}>
            <EventMiniCalendarView />
            {/*<EventCalendarView views={['month']}/>*/}
          </Grid>
          <Grid item md={7} sm={7}>
            <JobTrandsChart />
          </Grid>
          <Grid item md={5} sm={5}>
            <BangladeshMap />
          </Grid>
        </Grid>
      </StyledBox>
    </>
  );
};

export default Dashboard;