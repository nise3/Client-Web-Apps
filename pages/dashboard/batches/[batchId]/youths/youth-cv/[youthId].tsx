import asyncComponent from '../../../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthCVPage = asyncComponent(
  () => import('../../../../../../modules/dashboard/cvLists/YouthCVPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.trainee_cv'] as string} />
      <YouthCVPage />
    </>
  );
});
