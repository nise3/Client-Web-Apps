import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const SimilarCourseList = asyncComponent(
  () => import('../../../modules/similarCourseList'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course List'} />
      <SimilarCourseList />
    </>
  );
});
