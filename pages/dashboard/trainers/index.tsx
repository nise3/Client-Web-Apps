import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const TrainerPage = asyncComponent(
  () => import('../../../modules/dashboard/trainers/TrainerPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Trainer' />
    <TrainerPage />
  </>
));
