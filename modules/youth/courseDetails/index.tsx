import React, {useEffect, useState} from 'react';
import CourseDetailsHeaderSection from './CourseDetailsHeaderSection';
import CourseContentSection from './CourseContentSection';
import SimilarCourseSection from './SimilarCourseSection';
import CourseDetailsSkillMatchingJobSection from './CourseDetailsSkillMatchingJobSection';
import {useFetchPublicCourseDetailsWithParams} from '../../../services/instituteManagement/hooks';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

const CourseDetails = () => {
  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();
  let {courseId} = router.query;

  const [courseDetailsFilter, setCourseDetailsFilter] = useState<any>({});

  const {data: courseDetails} = useFetchPublicCourseDetailsWithParams(
    Number(courseId),
    courseDetailsFilter,
  );

  useEffect(() => {
    if (authUser && authUser?.isYouthUser) {
      setCourseDetailsFilter({
        youth_id: authUser?.youthId,
      });
    }
  }, [authUser]);

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
    <>
      <CourseDetailsHeaderSection 
      course={courseDetails} 
      youthId={ (courseDetailsFilter && courseDetailsFilter?.youth_id) ? courseDetailsFilter?.youth_id : null}
      />
      <CourseContentSection course={courseDetails} />
      <SimilarCourseSection skillIds={skillIds} courseId={Number(courseId)} />
      <CourseDetailsSkillMatchingJobSection
        skillIds={skillIds}
        courseId={courseId}
      />
    </>
  );
};

export default CourseDetails;
