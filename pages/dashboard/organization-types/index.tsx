import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@softbd/layouts/hoc/AppPage';
import React from 'react';

const OrganizationTypePage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/organizationTypes/OrganizationTypePage'
    ),
);
export default AppPage(() => (
  <>
    <PageMeta title='Organization Type' />
    <OrganizationTypePage />
  </>
));
