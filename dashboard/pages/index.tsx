import PageMeta from '../../@crema/core/PageMeta';
import DashboardPage from '../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';
import asyncComponent from '../../@crema/utility/asyncComponent';

const DashboardHomePage = asyncComponent(
  () => import('../../modules/dashboard'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.dashboard'] as string} />
      <DashboardHomePage/>
    </>
  );
});
