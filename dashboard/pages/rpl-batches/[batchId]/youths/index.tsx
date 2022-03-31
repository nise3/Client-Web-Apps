import asyncComponent from '../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const BatchesYouthList = asyncComponent(
  () => import('../../../../../modules/dashboard/RPLBatches/BatchesYouthList'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.youth_cv'] as string} />
      <BatchesYouthList />
    </>
  );
});
