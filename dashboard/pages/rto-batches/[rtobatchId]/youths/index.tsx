import asyncComponent from '../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const BatchYouthList = asyncComponent(
  () => import('../../../../../modules/dashboard/rtoBatches/RTOBatchYouthList'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.trainee_cv'] as string} />
      <BatchYouthList />
    </>
  );
});
