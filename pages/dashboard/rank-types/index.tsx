import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const RankTypesPage = asyncComponent(
  () => import('../../../modules/dashboard/rank-type/RankTypePage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Rank Type' />
    <RankTypesPage />
  </>
));
