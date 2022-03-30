import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';

const CourseDetailsPage = asyncComponent(
  () => import('../../../modules/youth/courseDetails'),
);
export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Details'} />
      <CourseDetailsPage />
    </>
  );
});
