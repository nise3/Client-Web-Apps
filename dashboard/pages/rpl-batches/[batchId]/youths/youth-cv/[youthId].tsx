import asyncComponent from '../../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthCVPage = asyncComponent(
  () => import('../../../../../../modules/dashboard/cvBank/YouthCVPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.youth_cv'] as string} />
      <YouthCVPage />
    </>
  );
});
