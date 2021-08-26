import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const UpazilasPage = asyncComponent(
  () => import('../../../modules/dashboard/upazilas/UpazilasPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Districts' />
    <UpazilasPage />
  </>
));
