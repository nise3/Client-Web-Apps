import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const NISEAllCourse = asyncComponent(
  () => import('../../../modules/youth/training/allCourseSection'),
);
export default InstituteFrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <NISEAllCourse />
    </>
  );
});
