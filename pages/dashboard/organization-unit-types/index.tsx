import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const OrganizationUnitTypePage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/organizationUnitTypes/OrganizationUnitTypePage'
    ),
);
export default AppPage(() => (
  <>
    <PageMeta title='Organization Unit Type' />
    <OrganizationUnitTypePage />
  </>
));
