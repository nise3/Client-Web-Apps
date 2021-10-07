import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';

const YouthCourseRegistrationSubmittedPage = asyncComponent(
  () => import('../../modules/youth-course-registration-submitted'),
);
export default FrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Registration'} />
      <YouthCourseRegistrationSubmittedPage />
    </>
  );
});
