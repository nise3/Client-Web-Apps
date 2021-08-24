import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const OrganizationUnitPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/organization-type/OrganizationTypePage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Organization Type' />
    <OrganizationUnitPage />
  </>
));
