import React from 'react';
import {Box, Container, Grid} from '@material-ui/core';
import CourseListHeaderSection from './CourseListHeaderSection';
import SkillMatchingCoursesSection from './SkillMatchingCoursesSection';
import useStyles from './index.style';

const CourseListPage = () => {
  const classes = useStyles();

  return (
    <Box className={classes.trainingViewRoot}>
      <CourseListHeaderSection />
      <Container className={classes.mainContent}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={12}>
            <SkillMatchingCoursesSection />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <SkillMatchingCoursesSection />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <SkillMatchingCoursesSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseListPage;
