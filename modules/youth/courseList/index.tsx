import React, {useState} from 'react';
import {Container, Grid, IconButton, Typography} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {useFetchCourseList} from '../../../services/instituteManagement/hooks';

const CourseList = () => {
  const {messages} = useIntl();
  const router = useRouter();

  let {course_category} = router.query;
  course_category = String(course_category)?.trim();

  const [courseFilters] = useState({});
  const {data: courseList} = useFetchCourseList(
    '/' + course_category,
    courseFilters,
  );

  const getMessageId = (category: any) => {
    switch (category) {
      case 'skill':
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
                {messages[getMessageId(course_category)]}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign={'right'}>
              <IconButton>
                <ListOutlinedIcon />
              </IconButton>
              <IconButton>
                <GridViewOutlinedIcon />
              </IconButton>
            </Grid>
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
