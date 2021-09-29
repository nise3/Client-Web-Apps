import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';

const CourseListPage = asyncComponent(() => import('../../modules/courseList'));
export default FrontPage(() => {
  return (
    <>
      <PageMeta title={'Course List'} />
      <CourseListPage />
    </>
  );
});
