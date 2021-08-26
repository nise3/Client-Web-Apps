import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const DivisionsPage = asyncComponent(
  () => import('../../../modules/dashboard/divisions/DivisionsPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Districts' />
    <DivisionsPage />
  </>
));
