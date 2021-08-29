import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const RankPage = asyncComponent(
  () => import('../../../modules/dashboard/ranks/rankPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Rank Type' />
    <RankPage />
  </>
));
