import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const JobDetailsPage = asyncComponent(
  () => import('../../../modules/industry/jobCircularDetails'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Job Circular Details'} />
      <JobDetailsPage />
    </>
  );
});
