import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const OrganizationTypePage = asyncComponent(
  () =>
    import('../../../modules/dashboard/organizationTypes/OrganizationTypePage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['organization_type.label']} />
      <OrganizationTypePage />
    </>
  );
});
