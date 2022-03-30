import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const JobRequirementPage = asyncComponent(
  () => import('../../../modules/dashboard/jobRequirements/JobRequirementPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['job_requirement.label'] as string} />
      <JobRequirementPage />
    </>
  );
});
