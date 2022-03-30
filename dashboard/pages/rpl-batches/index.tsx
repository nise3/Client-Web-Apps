import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const RPLBatchesPage = asyncComponent(
  () => import('../../../modules/dashboard/RPLBatches/RPLBatchesPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['batches.label']} />
      <RPLBatchesPage />
    </>
  );
});
