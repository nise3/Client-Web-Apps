import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const CourseDetailsPage = asyncComponent(
  () => import('../../../modules/youth/courseDetails'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Details'} />
      <CourseDetailsPage />
    </>
  );
});
