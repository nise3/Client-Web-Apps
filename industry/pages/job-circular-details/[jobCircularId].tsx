import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const JobCircularDetailsPage = asyncComponent(
  () => import('../../../modules/industry/job-circular-details/index'),
);
export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Course Details'} />
      <JobCircularDetailsPage />
    </>
  );
});
