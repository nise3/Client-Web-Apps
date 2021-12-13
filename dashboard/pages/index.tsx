import PageMeta from '../../@crema/core/PageMeta';
import DashboardPage from '../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';
import asyncComponent from '../../@crema/utility/asyncComponent';
import {useAuthUser} from '../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../redux/types/models/CommonAuthUser';

const DashboardHomePage = asyncComponent(
  () => import('../../modules/dashboard'),
);

const IndustryDashboardHomePage = asyncComponent(
  () => import('../../modules/dashboard/industryDashboard'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();

  return (
    <>
      <PageMeta title={messages['menu.dashboard'] as string} />
      {authUser?.isOrganizationUser && <IndustryDashboardHomePage />}
      {!authUser?.isOrganizationUser && <DashboardHomePage />}
    </>
  );
});
