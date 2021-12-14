import React, {useCallback, useEffect, useState} from 'react';
import {Box, Container, Grid} from '@mui/material';
import CourseListHeaderSection from './CourseListHeaderSection';
import SkillMatchingCoursesSection from './SkillMatchingCoursesSection';
import PopularCoursesSection from './PopularCoursesSection';
import TrendingCoursesSection from './TrendingCoursesSection';
import {useRouter} from 'next/router';
import {styled} from '@mui/material/styles';
import {getShowInTypeByDomain} from '../../../@softbd/utilities/helpers';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import {useVendor} from '../../../@crema/utility/AppHooks';

const PREFIX = 'AllCourseSection';

export const classes = {
  mainContent: `${PREFIX}-mainContent`,
};

export const StyledCourseSection = styled(Box)(({theme}) => ({
  margin: '0px auto 20px',

  [`& .${classes.mainContent}`]: {
    marginTop: 20,
  },
}));

const CourseListPage = () => {
  const [filters, setFilters] = useState<any>({});
  const router = useRouter();
  const {courseType} = router.query;
  const vendor = useVendor();
  const showInType = getShowInTypeByDomain();

  useEffect(() => {
    if (showInType && showInType == ShowInTypes.TSP) {
      setFilters((prev: any) => {
        return {...prev, ...{institute_id: vendor?.id}};
      });
    }
  }, [showInType]);

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
    <StyledCourseSection>
      <CourseListHeaderSection addFilterKey={filterCoursesListTrainingList} />
      <Container maxWidth={'lg'} className={classes.mainContent}>
        <Grid container spacing={5}>
          {courseType == 'skill-matching' && (
            <Grid item xs={12}>
              <SkillMatchingCoursesSection
                filters={filters}
                showAllCourses={true}
              />
            </Grid>
          )}
          {courseType == 'popular' && (
            <Grid item xs={12}>
              <PopularCoursesSection filters={filters} showAllCourses={true} />
            </Grid>
          )}

          {courseType == 'trending' && (
            <Grid item xs={12}>
              <TrendingCoursesSection filters={filters} showAllCourses={true} />
            </Grid>
          )}
        </Grid>
      </Container>
    </StyledCourseSection>
  );
};

export default CourseListPage;
