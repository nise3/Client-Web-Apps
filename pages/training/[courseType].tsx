import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';

const NISEAllCourse = asyncComponent(
  () => import('../../modules/youth/training/allCourseSection'),
);
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <NISEAllCourse />
    </>
  );
});
