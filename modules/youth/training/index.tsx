import React, {useCallback, useState} from 'react';
import {Box, Container, Grid} from '@mui/material';
import CourseListHeaderSection from './CourseListHeaderSection';
import SkillMatchingCoursesSection from './SkillMatchingCoursesSection';
import useStyles from './index.style';
import PopularCoursesSection from './PopularCoursesSection';
import NearbyTrainingCenterSection from './NearbyTrainingCenterSection';
import TrendingCoursesSection from './TrendingCoursesSection';

const CourseListPage = () => {
  const classes = useStyles();
  const [filters, setFilters] = useState<any>({});

  const filterCoursesListTrainingList = useCallback(
    (filterKey: string, filterValue: number | null) => {
      const newFilter: any = {};
      newFilter[filterKey] = filterValue;

      setFilters((prev: any) => {
        return {...prev, ...newFilter};
      });
    },
    [],
  );

  return (
    <Box className={classes.trainingViewRoot}>
      <CourseListHeaderSection addFilterKey={filterCoursesListTrainingList} />
      <Container maxWidth={'lg'} className={classes.mainContent}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <SkillMatchingCoursesSection filters={filters} page_size={4} />
          </Grid>
          <Grid item xs={12}>
            <PopularCoursesSection filters={filters} page_size={4} />
          </Grid>
          <Grid item xs={12}>
            <TrendingCoursesSection filters={filters} page_size={4} />
          </Grid>
          <Grid item xs={12}>
            <NearbyTrainingCenterSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CourseListPage;
