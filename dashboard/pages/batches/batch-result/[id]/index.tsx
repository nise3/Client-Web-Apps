import asyncComponent from '../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const BatchResultDetailsPage = asyncComponent(
  () =>
    import('../../../../../modules/dashboard/batches/BatchResultDetailsPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.batch_result'] as string} />
      <BatchResultDetailsPage />
    </>
  );
});
