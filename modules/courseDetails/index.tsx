import React from 'react';
import {Container} from '@mui/material';
import CourseDetailsHeaderSection from './CourseDetailsHeaderSection';
import CourseContentSection from './CourseContentSection';
import SimilarCourseSection from './SimilarCourseSection';
import CourseDetailsSkillMatchingJobSection from './CourseDetailsSkillMatchingJobSection';
import useStyle from './index.style';

const CourseDetails = () => {
  const classes = useStyle();

  const courseDetails = {
    logo: '/images/popular-course1.png',
    title: 'The Python Mega Course: Build 10 Real World Applications',
    fee: '5,000',
    tags: ['2hr, 47 min', '24 lesson'],
    courseEnrolled: '12,581 enrolled',
    lessonsList: [
      {
        name: 'Introduction',
        duration: '6.22',
      },
      {
        name: 'Started with python',
        duration: '6.22',
      },
      {
        name: 'Data Types',
        duration: '6.22',
      },
      {
        name: 'Operation with data types',
        duration: '6.22',
      },
    ],
    trainer: {
      firstName: 'Jisan',
      lastName: 'Rahman',
      image: '/images/userPageImages/profileImage.jpeg',
      about: 'Specializing in solving complex design problem',
    },
  };

  return (
    <Container maxWidth={'xl'} className={classes.rootContent}>
      <CourseDetailsHeaderSection course={courseDetails} />
      <CourseContentSection course={courseDetails} />
      <SimilarCourseSection />
      <CourseDetailsSkillMatchingJobSection />
    </Container>
  );
};

export default CourseDetails;
