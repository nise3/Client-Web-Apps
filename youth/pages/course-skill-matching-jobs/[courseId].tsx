import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const JobListPage = asyncComponent(
  () => import('../../../modules/courseSkillMatchingJobs'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Skill Matching Jobs'} />
      <JobListPage />
    </>
  );
});
