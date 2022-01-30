import React, {useCallback, useState} from 'react';
import {Box, Container, Grid} from '@mui/material';
import CourseListHeaderSection from './CourseListHeaderSection';
import SkillMatchingCoursesSection from './SkillMatchingCoursesSection';
import PopularCoursesSection from './PopularCoursesSection';
import NearbyTrainingCenterSection from './NearbyTrainingCenterSection';
import TrendingCoursesSection from './TrendingCoursesSection';
import {styled} from '@mui/material/styles';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {getShowInTypeByDomain} from '../../../@softbd/utilities/helpers';

const PREFIX = 'TrainingPage';

export const classes = {
  mainContent: `${PREFIX}-mainContent`,
};

export const StyledTrainingRoot = styled(Box)(({theme}) => ({
  margin: '0px auto 20px',

  [`& .${classes.mainContent}`]: {
    marginTop: 20,
  },
}));

const CourseListPage = () => {
  const authUser = useAuthUser<YouthAuthUser>();
  const showInType = getShowInTypeByDomain();

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
    <StyledTrainingRoot>
      <CourseListHeaderSection addFilterKey={filterCoursesListTrainingList} />
      <Container maxWidth={'lg'} className={classes.mainContent}>
        <Grid container>
          {authUser && authUser?.isYouthUser && (
            <Grid item xs={12}>
              <SkillMatchingCoursesSection
                filters={filters}
                showAllCourses={false}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <PopularCoursesSection filters={filters} showAllCourses={false} />
          </Grid>
          <Grid item xs={12}>
            <TrendingCoursesSection filters={filters} showAllCourses={false} />
          </Grid>
          <Grid item xs={12}>
            <NearbyTrainingCenterSection showInType={showInType} />
          </Grid>
        </Grid>
      </Container>
    </StyledTrainingRoot>
  );
};

export default CourseListPage;
