import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const OrganizationPage = asyncComponent(
  () => import('../../../modules/dashboard/organizations/OrganizationPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Organization' />
    <OrganizationPage />
  </>
));
