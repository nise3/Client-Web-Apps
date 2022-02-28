import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const IndustryAssociationsPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/industryAssociationMemberJobs/IndustryAssociationMemberJobsPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['industry_association_member_job.label']} />
      <IndustryAssociationsPage />
    </>
  );
});
