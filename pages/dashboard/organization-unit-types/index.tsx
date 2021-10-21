import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';

const OrganizationUnitTypePage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/organizationUnitTypes/OrganizationUnitTypePage'
    ),
);
export default DashboardPage(() => (
  <>
    <PageMeta title='Organization Unit Type' />
    <OrganizationUnitTypePage />
  </>
));
