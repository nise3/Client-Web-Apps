import React, {useEffect, useState} from 'react';
import {useFetchCourseDetailsWithParams} from '../../../services/instituteManagement/hooks';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';

const JobCircularDetails = () => {
  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();
  let {courseId} = router.query;

  const [courseDetailsFilter, setCourseDetailsFilter] = useState<any>({});

  const {data: courseDetails} = useFetchCourseDetailsWithParams(
    Number(courseId),
    courseDetailsFilter,
  );

  return (
    <>
      <h3>job circular details</h3>
    </>
  );
};

export default JobCircularDetails;
