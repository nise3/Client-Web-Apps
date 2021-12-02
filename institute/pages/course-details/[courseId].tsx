import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const CourseDetailsPage = asyncComponent(
  () => import('../../../modules/youth/courseDetails'),
);
export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Details'} />
      <CourseDetailsPage />
    </>
  );
});
