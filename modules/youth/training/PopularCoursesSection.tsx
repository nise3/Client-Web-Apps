import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';
import useStyles from './index.style';
import CourseCardComponent from '../../../@softbd/elements/CourseCardComponent';
import {useIntl} from 'react-intl';

const PopularCoursesSection = () => {
  const classes = useStyles();
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

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container alignItems={'center'}>
          <Grid item xs={8} sm={9} md={10}>
            <Typography variant={'h5'} className={classes.sectionTitle}>
              {messages['common.popular_courses']}
            </Typography>
          </Grid>
          <Grid item xs={4} sm={3} md={2} style={{textAlign: 'right'}}>
            <Button variant={'outlined'} size={'medium'} color={'primary'}>
              {messages['common.see_all']}
              <ChevronRight />
            </Button>
          </Grid>
        </Grid>
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
  );
};

export default PopularCoursesSection;
