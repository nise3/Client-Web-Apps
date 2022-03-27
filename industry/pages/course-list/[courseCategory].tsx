import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';

const CourseCategoryPage = asyncComponent(
  () => import('../../../modules/youth/courseList'),
);
export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Category '} />
      <CourseCategoryPage />
    </>
  );
});
