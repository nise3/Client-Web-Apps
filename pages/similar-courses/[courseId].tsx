import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';

const SimilarCourseList = asyncComponent(
  () => import('../../modules/similarCourseList'),
);
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course List'} />
      <SimilarCourseList />
    </>
  );
});
