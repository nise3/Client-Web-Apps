import React, {useEffect, useState} from 'react';
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
  const [skillIds, setSkillIds] = useState<Array<number>>([]);

  useEffect(() => {
    let skillIDs: Array<number> = [];
    if (courseDetails?.skills) {
      courseDetails.skills.map((skill: any) => {
        skillIDs.push(skill.id);
      });
    }
    setSkillIds(skillIDs);
  }, [courseDetails]);

  return (
    <Container maxWidth={'xl'} sx={{marginTop: 5, marginBottom: 5}}>
      <CourseDetailsHeaderSection course={courseDetails} />
      <CourseContentSection course={courseDetails} />
      <SimilarCourseSection skillIds={skillIds} />
      <CourseDetailsSkillMatchingJobSection />
    </Container>
  );
};

export default CourseDetails;
