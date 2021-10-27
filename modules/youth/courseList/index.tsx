import React, {useEffect, useState} from 'react';
import {Container, Grid, Typography} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {useFetchCourseList} from '../../../services/youthManagement/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

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

  return (
    <Container>
      <Grid container spacing={3} padding={5}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography fontWeight={'bold'} variant={'h6'}>
                {messages[getMessageId(courseCategory)]}
              </Typography>
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
                <CourseCardComponent course={course} />
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default CourseList;
