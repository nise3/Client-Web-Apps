import React from 'react';
import {useIntl} from 'react-intl';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../@crema/core/PageMeta';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const FourIRTaglinePage = asyncComponent(
  () => import('../../../modules/dashboard/4IRExpertTeam/FourIRExpertTeamPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.initiative']} />
      <FourIRTaglinePage />
    </>
  );
});
