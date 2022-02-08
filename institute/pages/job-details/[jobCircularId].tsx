import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const JobDetailsPage = asyncComponent(
  () => import('../../../modules/industry/jobCircularDetails'),
);
export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Job Circular Details'} />
      <JobDetailsPage />
    </>
  );
});
