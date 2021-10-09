import React from 'react';
import {Container, Grid, IconButton, Typography} from '@mui/material';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';

const CourseList = () => {
  const {messages} = useIntl();
  const router = useRouter();

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
    },
  ];
  const {course_category} = router.query;

  const getMessageId = (category: any) => {
    switch (category) {
      case 'recent':
        return 'common.recent_courses';
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
        {courseList.map((course: any) => {
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
