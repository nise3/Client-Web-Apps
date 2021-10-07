import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';

const CourseDetailsPage = asyncComponent(
  () => import('../../../modules/youth/courseDetails'),
);
export default FrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Details'} />
      <CourseDetailsPage />
    </>
  );
});
