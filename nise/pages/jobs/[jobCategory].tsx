import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const JobListByCategoryPage = asyncComponent(
  () => import('../../../modules/youth/jobList'),
);
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Job list '} />
      <JobListByCategoryPage />
    </>
  );
});
