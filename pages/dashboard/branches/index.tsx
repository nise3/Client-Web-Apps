import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const BranchPage = asyncComponent(
  () => import('../../../modules/dashboard/branches/BranchPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Branch' />
    <BranchPage />
  </>
));
