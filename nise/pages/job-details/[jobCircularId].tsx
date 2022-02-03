import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const JobDetailsPage = asyncComponent(
  () => import('../../../modules/industry/jobCircularDetails'),
);
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Job Circular Details'} />
      <JobDetailsPage />
    </>
  );
});
