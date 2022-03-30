import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';

const JobListByCategoryPage = asyncComponent(
  () => import('../../../modules/youth/jobList'),
);
export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Job list '} />
      <JobListByCategoryPage />
    </>
  );
});
