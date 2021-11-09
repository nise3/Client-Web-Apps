import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const StaticPage = asyncComponent(
  () => import('../../../modules/dashboard/staticPages/StaticPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['static_page.label'] as string} />
      <StaticPage />
    </>
  );
});
