import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const JobCategoryPage = asyncComponent(
  () => import('../../../modules/youth/jobList'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'job list '} />
      <JobCategoryPage />
    </>
  );
});
