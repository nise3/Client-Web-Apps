import React, {useCallback, useEffect, useState} from 'react';
import {Box, Container, Grid} from '@mui/material';
import CourseListHeaderSection from './CourseListHeaderSection';
import SkillMatchingCoursesSection from './SkillMatchingCoursesSection';
import PopularCoursesSection from './PopularCoursesSection';
import NearbyTrainingCenterSection from './NearbyTrainingCenterSection';
import TrendingCoursesSection from './TrendingCoursesSection';
import {styled} from '@mui/material/styles';
import {useAuthUser, useVendor} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

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
  const vendor = useVendor();
  const authUser = useAuthUser<YouthAuthUser>();
  const [filters, setFilters] = useState<any>({});
  const [instituteId] = useState<any>(vendor?.id);

  useEffect(() => {
    if (instituteId) {
      setFilters((prev: any) => {
        return {...prev, ...{institute_id: instituteId}};
      });
    }
  }, [instituteId]);

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
              <SkillMatchingCoursesSection filters={filters} page_size={4} />
            </Grid>
          )}
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
    </StyledTrainingRoot>
  );
};

export default CourseListPage;
