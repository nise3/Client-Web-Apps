import React from 'react';
import {Container} from '@mui/material';
import CourseDetailsHeaderSection from './CourseDetailsHeaderSection';
import CourseContentSection from './CourseContentSection';
import SimilarCourseSection from './SimilarCourseSection';
import CourseDetailsSkillMatchingJobSection from './CourseDetailsSkillMatchingJobSection';
import {useFetchCourseDetails} from '../../../services/instituteManagement/hooks';
import {useRouter} from 'next/router';

const CourseDetails = () => {
  const router = useRouter();
  let {courseId} = router.query;

  const {data: courseDetails} = useFetchCourseDetails(Number(courseId));

  return (
    <Container maxWidth={'xl'} sx={{marginTop: 5, marginBottom: 5}}>
      <CourseDetailsHeaderSection course={courseDetails} />
      <CourseContentSection course={courseDetails} />
      <SimilarCourseSection />
      <CourseDetailsSkillMatchingJobSection />
    </Container>
  );
};

export default CourseDetails;
