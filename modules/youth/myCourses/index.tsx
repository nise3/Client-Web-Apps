import React from 'react';
import {Container, Grid, Typography} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';

const MyCoursePage = () => {
  const {messages} = useIntl();

  const courseList = [
    {
      id: 1,
      image: '/images/popular-course1.png',
      title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
      fee: '5,000',
      providerLogo: '/images/creative_it.jpeg',
      providerName: 'Diane Croenwett',
      createDate: 'Mar 19,2020',
      tags: ['2hr, 47 min', '24 lessons'],
      progress: 55,
    },
    {
      id: 2,
      image: '/images/popular-course1.png',
      title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
      fee: '5,000',
      providerLogo: '/images/creative_it.jpeg',
      providerName: 'Diane Croenwett',
      createDate: 'Mar 19,2020',
      tags: ['2hr, 47 min', '24 lessons'],
      progress: 35,
    },
    {
      id: 3,
      image: '/images/popular-course1.png',
      title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
      fee: '5,000',
      providerLogo: '/images/creative_it.jpeg',
      providerName: 'Diane Croenwett',
      createDate: 'Mar 19,2020',
      tags: ['2hr, 47 min', '24 lessons'],
      progress: 80,
    },
    {
      id: 4,
      image: '/images/popular-course1.png',
      title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
      fee: '5,000',
      providerLogo: '/images/creative_it.jpeg',
      providerName: 'Diane Croenwett',
      createDate: 'Mar 19,2020',
      tags: ['2hr, 47 min', '24 lessons'],
      progress: 65,
    },
  ];

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
            {courseList.map((course: any) => {
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
