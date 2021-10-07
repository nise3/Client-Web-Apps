import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const TrainingCenterPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/trainingCenters/TrainingCenterPage'),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['training_center.label']} />
      <TrainingCenterPage />
    </>
  );
});
