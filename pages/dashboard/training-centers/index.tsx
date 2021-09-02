import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const TrainingCenterPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/training-centers/TrainingCenterPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Training Center' />
    <TrainingCenterPage />
  </>
));
