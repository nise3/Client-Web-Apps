import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const JobSectorPage = asyncComponent(
  () => import('../../../modules/dashboard/jobSectors/JobSectorPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['job_sectors.label']} />
      <JobSectorPage />
    </>
  );
});
