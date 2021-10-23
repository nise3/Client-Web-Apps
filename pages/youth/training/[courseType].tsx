import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthAllCourse = asyncComponent(
  () => import('../../../modules/youth/training/allCourseSection'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Training'} />
      <YouthAllCourse />
    </>
  );
});
