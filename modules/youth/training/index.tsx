import React, {useCallback, useState} from 'react';
import {Box, Container, Grid} from '@mui/material';
import CourseListHeaderSection from './CourseListHeaderSection';
import SkillMatchingCoursesSection from './SkillMatchingCoursesSection';
import useStyles from './index.style';
import PopularCoursesSection from './PopularCoursesSection';
import NearbyTrainingCenterSection from './NearbyTrainingCenterSection';
import TrendingCoursesSection from './TrendingCoursesSection';

const objectFilter = (object: any) => {
  Object.keys(object).forEach((key) => {
    if (!object[key]) {
      delete object[key];
    }
  });

  return object;
};

const CourseListPage = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState<any>({});

  const filterCoursesListTrainingList = useCallback(
    (filterKey: string, filterValue: number | null) => {
      const newFilter: any = {};
      newFilter[filterKey] = filterValue;

      setFilters((prev: any) => {
        return objectFilter({...prev, ...newFilter});
      });
    },
    [],
  );

  return (
    <Box className={classes.trainingViewRoot}>
      <CourseListHeaderSection filterAction={filterCoursesListTrainingList} />
      <Container maxWidth={'xl'} className={classes.mainContent}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <SkillMatchingCoursesSection filters={filters} />
          </Grid>
          <Grid item xs={12}>
            <NearbyTrainingCenterSection />
          </Grid>
          <Grid item xs={12}>
            <PopularCoursesSection filters={filters} />
          </Grid>
          <Grid item xs={12}>
            <TrendingCoursesSection filters={filters} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseListPage;
