import React, {useState} from 'react';
import {Container, Grid, Typography} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchCourseList} from '../../../services/instituteManagement/hooks';

const MyCoursePage = () => {
  const {messages} = useIntl();

  const [courseFilters] = useState({page_size: 4});

  const pathVariable = '/my-courses';
  const {data: courseList} = useFetchCourseList(pathVariable, courseFilters);

  return (
    <Container maxWidth={'xl'} sx={{padding: 5}}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {messages['common.my_courses']}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={5}>
            {courseList &&
              courseList.map((course: any) => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={course.id}>
                    <CourseCardComponent course={course} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyCoursePage;
