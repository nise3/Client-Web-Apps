import React from 'react';
import {Grid} from '@material-ui/core';
import BasicInfo from './BasicInfo';
import OverviewSection from './OverviewSection';
import FeatureJobSection from './FeatureJobSection';
import PostSection from './PostSection';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import RecentJobSection from './RecentJobSection';
import RecentCourseSection from './RecentCourseSection';
import SideMenu from '../../@softbd/elements/YouthSideMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('md')]: {
        alignItems: 'center',
        flexDirection: 'column',
      },
    },
  }),
);

const YouthFeedPage = () => {
  const classes: any = useStyles();
  return (
    <>
      <Grid container spacing={5} className={classes.root}>
        <Grid item container xs={12} md={3} spacing={5}>
          <Grid item xs={12}>
            <BasicInfo />
          </Grid>
          <Grid item xs={12}>
            <SideMenu />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <OverviewSection />
          <FeatureJobSection />
          <PostSection />
        </Grid>
        <Grid item xs={12} md={3}>
          <RecentJobSection />
          <RecentCourseSection />
        </Grid>
      </Grid>
    </>
  );
};

export default YouthFeedPage;
