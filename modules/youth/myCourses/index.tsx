import React, {useState} from 'react';
import {Container, Grid, Typography} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';
import {useFetchYouthCourses} from '../../../services/youthManagement/hooks';
import {Link} from '../../../@softbd/elements/common';
import BoxCardsSkeleton from '../../institute/Components/BoxCardsSkeleton';

const MyCoursePage = () => {
  const {messages} = useIntl();

  const [courseFilters] = useState({});

  const {data: courseList, isLoading: isLoadingCourses} =
    useFetchYouthCourses(courseFilters);

  return isLoadingCourses ? (
    <BoxCardsSkeleton />
  ) : courseList && courseList?.length ? (
    <Container maxWidth={'lg'} sx={{padding: 5}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant={'h5'} fontWeight={'bold'}>
            {messages['common.my_courses']}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={5}>
            {courseList.map((course: any) => {
              return (
                <Grid item xs={12} sm={6} md={3} key={course.id}>
                  <Link href={`/course-details/${course.course_id}`}>
                    <CourseCardComponent
                      course={{
                        id: course.course_id,
                        course_fee: course.course_fee,
                        cover_image: course.cover_image,
                        title: course.course_title,
                        institute_title: course.institute_title,
                        created_at: course.course_created_at,
                        duration: course.duration,
                        progress: (course.id * 40) % 100,
                      }}
                    />
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
      <Typography variant={'h4'}>
        {messages['common.no_enrolled_course_found']}
      </Typography>
    </Grid>
  );
};

export default MyCoursePage;
