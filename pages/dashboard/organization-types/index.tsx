import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';

const OrganizationTypePage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/organizationTypes/OrganizationTypePage'
    ),
);
export default DashboardPage(() => (
  <>
    <PageMeta title='Organization Type' />
    <OrganizationTypePage />
  </>
));
