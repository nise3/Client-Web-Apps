import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Header from './Header';
import CoverArea from './CoverArea';
import InfoCardSection from './InfoCardSection';
import SelfAssessment from './SelfAssessment';
import StatisticsCardSection from './StatisticsCardSection';
import Nise3WorkProcess from './Nise3WorkProcess';
import RecentActivities from './RecentActivities';
import PopularCourse from './PopularCourse';
import SkillMatchingJobs from './SkillMatchingJobs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  }),
);

const Home: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Header />
        <CoverArea />
        <InfoCardSection />
        <SelfAssessment />
        <StatisticsCardSection />
        <Nise3WorkProcess />
        <RecentActivities />
        <PopularCourse />
        <SkillMatchingJobs />
      </Grid>
    </div>
  );
};

export default Home;
