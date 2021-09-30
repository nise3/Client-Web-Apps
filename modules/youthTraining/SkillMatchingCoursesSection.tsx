import React from 'react';
import {Box, Button, Grid} from '@material-ui/core';
import {ChevronRight} from '@material-ui/icons';
import CourseCardComponent from './conponents/CourseCardComponent';

const SkillMatchingCoursesSection = () => {
  const courseList = [
    {
      id: 1,
      image: '/images/popular-course1.png',
      title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
      fee: '5,000',
      providerLogo: '/images/popular-course1.png',
      providerName: 'Diane Croenwett',
      createDate: 'Mar 19,2020',
      tags: ['2hr, 47 min', '24 lessons'],
    },
    {
      id: 2,
      image: '/images/popular-course1.png',
      title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
      fee: '5,000',
      providerLogo: '/images/popular-course1.png',
      providerName: 'Diane Croenwett',
      createDate: 'Mar 19,2020',
      tags: ['2hr, 47 min', '24 lessons'],
    },
    {
      id: 3,
      image: '/images/popular-course1.png',
      title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
      fee: '5,000',
      providerLogo: '/images/popular-course1.png',
      providerName: 'Diane Croenwett',
      createDate: 'Mar 19,2020',
      tags: ['2hr, 47 min', '24 lessons'],
    },
    {
      id: 4,
      image: '/images/popular-course1.png',
      title: 'Design a Beautiful Stationary Set in Adobe Photoshop',
      fee: '5,000',
      providerLogo: '/images/popular-course1.png',
      providerName: 'Diane Croenwett',
      createDate: 'Mar 19,2020',
      tags: ['2hr, 47 min', '24 lessons'],
    },
  ];

  return (
    <Box>
      <Box>
        <Box>Skill Matching Courses</Box>
        <Box>
          <Button variant={'outlined'} size={'medium'} color={'primary'}>
            See All
            <ChevronRight />
          </Button>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {courseList.map((course: any) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={course.id}>
              <CourseCardComponent course={course} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SkillMatchingCoursesSection;
