import React, {useState} from 'react';
import {Container, Grid, Typography} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchYouthCourses} from '../../../services/youthManagement/hooks';
import {LINK_FRONTEND_YOUTH_COURSE_DETAILS} from '../../../@softbd/common/appLinks';
import {Link} from '../../../@softbd/elements/common';

const MyCoursePage = () => {
  const {messages} = useIntl();

  const [courseFilters] = useState({page_size: 4});

  const {data: courseList} = useFetchYouthCourses(courseFilters);

  return courseList?.length ? (
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
                    <Link href={LINK_FRONTEND_YOUTH_COURSE_DETAILS + course.id}>
                      <CourseCardComponent course={course} />
                    </Link>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Grid container sx={{justifyContent: 'center', marginTop: 5}}>
      <Typography variant={'h4'}>No Enrolled Course Found</Typography>
    </Grid>
  );
};

export default MyCoursePage;
