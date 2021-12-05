import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const CourseCategoryPage = asyncComponent(
  () => import('../../../modules/youth/courseList'),
);
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Category '} />
      <CourseCategoryPage />
    </>
  );
});
