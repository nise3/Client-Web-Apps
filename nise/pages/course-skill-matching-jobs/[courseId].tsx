import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const JobListPage = asyncComponent(
  () => import('../../../modules/courseSkillMatchingJobs'),
);
export default NiseFrontPage(() => {
  return (
    <>
      <PageMeta title={'Skill Matching Jobs'} />
      <JobListPage />
    </>
  );
});
