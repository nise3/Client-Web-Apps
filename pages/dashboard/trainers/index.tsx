import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const TrainerPage = asyncComponent(
  () => import('../../../modules/dashboard/trainers/TrainerPage'),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['trainers.label']} />
      <TrainerPage />
    </>
  );
});