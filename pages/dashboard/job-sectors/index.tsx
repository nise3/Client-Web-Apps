import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const JobSectorPage = asyncComponent(
  () => import('../../../modules/dashboard/job-sectors/JobSectorPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Job Sector' />
    <JobSectorPage />
  </>
));
