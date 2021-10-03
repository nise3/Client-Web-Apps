import React from 'react';
import {Box} from '@mui/material';
import CourseDetailsHeaderSection from './CourseDetailsHeaderSection';
import CourseContentSection from './CourseContentSection';

const CourseDetails = () => {
  const courseDetails = {
    logo: '/images/popular-course1.png',
    title: 'The Python Mega Course: Build 10 Real World Applications',
    fee: '5,000',
    tags: ['2hr, 47 min', '24 lesson'],
    courseEnrolled: '12,581 enrolled',
  };

  return (
    <Box>
      <CourseDetailsHeaderSection course={courseDetails} />
      <CourseContentSection course={courseDetails} />
    </Box>
  );
};

export default CourseDetails;
