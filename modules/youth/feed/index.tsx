import React from 'react';
import BasicInfo from './BasicInfo';
import OverviewSection from './OverviewSection';
import FeatureJobSection from './FeatureJobSection';
import PostSection from './PostSection';
import RecentJobSection from './RecentJobSection';
import RecentCourseSection from './RecentCourseSection';
import SideMenu from '../../../@softbd/elements/YouthSideMenu';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {Container, Grid} from '@mui/material';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme: CremaTheme) => ({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  root: {
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      flexDirection: 'column',
    },
  },
}));

const YouthFeedPage = () => {
  const classes: any = useStyles();
  return (
    <Container maxWidth={'xl'} className={classes.container}>
      <Grid container spacing={5} className={classes.root}>
        <Grid item xs={12} md={3}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <BasicInfo />
            </Grid>
            <Grid item xs={12}>
              <SideMenu />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <OverviewSection />
            </Grid>
            <Grid item xs={12}>
              <FeatureJobSection />
            </Grid>
            <Grid item xs={12}>
              <PostSection />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <RecentJobSection />
            </Grid>
            <Grid item xs={12}>
              <RecentCourseSection />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default YouthFeedPage;
