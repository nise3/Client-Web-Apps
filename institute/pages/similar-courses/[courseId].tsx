import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const SimilarCourseList = asyncComponent(
  () => import('../../../modules/similarCourseList'),
);
export default InstituteFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course List'} />
      <SimilarCourseList />
    </>
  );
});
