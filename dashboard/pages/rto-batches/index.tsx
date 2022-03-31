import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';
// import {useIntl} from 'react-intl';

const RTOBatchesPage = asyncComponent(
  () => import('../../../modules/dashboard/rtoBatches/RTOBatchPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['rto_batch.label']} />
      <RTOBatchesPage />
    </>
  );
});
