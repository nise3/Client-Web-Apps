import React, {useCallback, useEffect, useState} from 'react';
import {Container, Grid} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {H1, Link} from '../../../@softbd/elements/common';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {styled} from '@mui/material/styles';
import {useFetchCourseList} from '../../../services/instituteManagement/hooks';
import CourseListHeaderSection from '../training/CourseListHeaderSection';

const PREFIX = 'CourseList';

export const classes = {
  header: `${PREFIX}-header`,
};

export const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.header}`]: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}));

const CourseList = () => {
  const {messages} = useIntl();
  const router = useRouter();

  let {courseCategory} = router.query;
  courseCategory = String(courseCategory)?.trim();
  const authYouth = useAuthUser<YouthAuthUser>();

  const [courseFilters, setCourseFilters] = useState({});
  const {data: courseList} = useFetchCourseList(courseCategory, courseFilters);

  useEffect(() => {
    if (courseCategory == 'nearby')
      setCourseFilters((prevState) => {
        return {...prevState, loc_district_id: authYouth?.loc_district_id};
      });
  }, [authYouth]);

  const getMessageId = (category: any) => {
    switch (category) {
      case 'skill-matching':
        return 'common.skill_courses';
      case 'trending':
        return 'common.trending_courses';
      case 'popular':
        return 'common.popular_courses';
      case 'nearby':
        return 'common.nearby_courses';
      default:
        return 'common.recent_courses';
    }
  };

  const filterPopularCoursesList = useCallback(
    (filterKey: string, filterValue: number | null) => {
      const newFilter: any = {};
      newFilter[filterKey] = filterValue;

      console.log('nwe filter->', newFilter);

      setCourseFilters((prev: any) => {
        return {...prev, ...newFilter};
      });
    },
    [],
  );

  return (
    <>
      <CourseListHeaderSection addFilterKey={filterPopularCoursesList} />
      <StyledContainer>
        <Grid container spacing={3} padding={5}>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <H1 className={classes.header}>
                  {messages[getMessageId(courseCategory)]}
                </H1>
              </Grid>
              {/*<Grid item xs={6} textAlign={'right'}>*/}
              {/*  <IconButton>*/}
              {/*    <ListOutlinedIcon />*/}
              {/*  </IconButton>*/}
              {/*  <IconButton>*/}
              {/*    <GridViewOutlinedIcon />*/}
              {/*  </IconButton>*/}
              {/*</Grid>*/}
            </Grid>
          </Grid>
          {courseList &&
            courseList.map((course: any) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={course.id}>
                  <Link href={`/course-details/${course.id}`}>
                    <CourseCardComponent course={course} />
                  </Link>
                </Grid>
              );
            })}
        </Grid>
      </StyledContainer>
    </>
  );
};

export default CourseList;
