import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';

const CourseCategoryPage = asyncComponent(
  () => import('../../../modules/youth/courseList'),
);
export default FrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Category '} />
      <CourseCategoryPage />
    </>
  );
});
