import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const CourseCategoryPage = asyncComponent(
  () => import('../../../modules/youth/courseList'),
);
export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Category '} />
      <CourseCategoryPage />
    </>
  );
});
