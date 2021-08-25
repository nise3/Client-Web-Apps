import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const OccupationsPage = asyncComponent(
  () => import('../../../modules/dashboard/occupations/OccupationsPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Occupations' />
    <OccupationsPage />
  </>
));
