import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const JobListPage = asyncComponent(
  () => import('../../../modules/courseSkillMatchingJobs'),
);
export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={'Skill Matching Jobs'} />
      <JobListPage />
    </>
  );
});
