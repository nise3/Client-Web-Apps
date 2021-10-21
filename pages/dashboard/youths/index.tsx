import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthPage = asyncComponent(
  () => import('../../../modules/dashboard/youths/YouthPage'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['youth.label'] as string} />
      <YouthPage />
    </>
  );
});
