import React from 'react';
import {useIntl} from 'react-intl';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../@crema/core/PageMeta';

const YouthCVPage = asyncComponent(
  () => import('../../../modules/dashboard/cvLists/YouthCVPage'),
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
