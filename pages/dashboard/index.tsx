import React from 'react';
import AppPage from '../../@crema/hoc/AppPage';
import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';

const Index = asyncComponent(
  () => import('../../modules/dashboard/HealthCare'),
);
export default AppPage(() => (
  <React.Fragment>
    <PageMeta title='Dashboard' />
    <Index />
  </React.Fragment>
));
