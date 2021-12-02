import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const CourseCategoryPage = asyncComponent(
  () => import('../../../modules/youth/courseList'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Category '} />
      <CourseCategoryPage />
    </>
  );
});
