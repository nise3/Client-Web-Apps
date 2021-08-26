import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const DistrictsPage = asyncComponent(
  () => import('../../../modules/dashboard/districts/DistrictsPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Districts' />
    <DistrictsPage />
  </>
));
