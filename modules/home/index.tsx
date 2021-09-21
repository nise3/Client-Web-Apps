import React from 'react';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import {Container, createTheme} from '@material-ui/core';
import Header from './Header';
import CoverArea from './CoverArea';
import InfoCardSection from './InfoCardSection';
import SelfAssessment from './SelfAssessment';
import StatisticsCardSection from './StatisticsCardSection';
import Nise3WorkProcess from './Nise3WorkProcess';
import RecentActivities from './RecentActivities';
import PopularCourse from './PopularCourse';
import SkillMatchingJobs from './SkillMatchingJobs';
import Partners from './Partners';
import Footer from './Footer';
import BdMap from './BdMap';
import {ThemeProvider} from '@material-ui/styles';

const customTheme = createTheme({
  typography: {
    fontFamily: ['NotoSerifBangla', 'Poppins', 'sans-serif'].join(','),
    h6: {
      fontFamily: ['NotoSerifBangla', 'Poppins', 'sans-serif'].join(','),
    },
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: 0,
    },
  }),
);

const Home = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={customTheme}>
      <Container maxWidth={'xl'} className={classes.root}>
        <Header />
        <CoverArea />
        <InfoCardSection />
        <SelfAssessment />
        <StatisticsCardSection />
        <Nise3WorkProcess />
        <RecentActivities />
        <BdMap />
        <PopularCourse />
        <SkillMatchingJobs />
        <Partners />
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default Home;
