import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const Nise3PartnersPage = asyncComponent(
  () => import('../../../modules/dashboard/nise3-partners/Nise3PartnersPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.faq'] as string} />
      <Nise3PartnersPage />
    </>
  );
});
