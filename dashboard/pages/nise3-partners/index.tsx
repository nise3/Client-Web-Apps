import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';


const Nise3PartnersPage = asyncComponent(
  () => import('../../../modules/dashboard/nise3Partners/Nise3PartnersPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.partner'] as string} />
      <Nise3PartnersPage />
    </>
  );
});
