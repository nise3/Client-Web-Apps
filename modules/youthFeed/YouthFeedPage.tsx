import React from 'react';
import {Grid} from '@material-ui/core';
import BasicInfo from './BasicInfo';
import OverviewSection from './OverviewSection';
import FeatureJobSection from './FeatureJobSection';
import PostSection from './PostSection';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import RecentJobSection from './RecentJobSection';
import RecentCourseSection from './RecentCourseSection';
import SideMenu from '../../@softbd/elements/YouthSideMenu';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) =>
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
    </>
  );
};

export default YouthFeedPage;
