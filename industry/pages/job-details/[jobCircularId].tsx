import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';

const JobDetailsPage = asyncComponent(
  () => import('../../../modules/industry/jobCircularDetails'),
);
export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Job Circular Details'} />
      <JobDetailsPage />
    </>
  );
});
