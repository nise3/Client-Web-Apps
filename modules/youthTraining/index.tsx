import React from 'react';
import {Box, Container, Grid} from '@mui/material';
import CourseListHeaderSection from './CourseListHeaderSection';
import SkillMatchingCoursesSection from './SkillMatchingCoursesSection';
import useStyles from './index.style';
import PopularCoursesSection from './PopularCoursesSection';
import NearbyTrainingCenterSection from './NearbyTrainingCenterSection';
import TrendingCoursesSection from './TrendingCoursesSection';

const CourseListPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.trainingViewRoot}>
      <CourseListHeaderSection />
      <Container maxWidth={'xl'} className={classes.mainContent}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12}>
            <SkillMatchingCoursesSection />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <NearbyTrainingCenterSection />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <PopularCoursesSection />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TrendingCoursesSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseListPage;
