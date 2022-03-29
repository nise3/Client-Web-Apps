import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';
// import {useIntl} from 'react-intl';

const RTOCountryPage = asyncComponent(
  () => import('../../../modules/dashboard/rtoCountries/RTOCountryPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['rto_country.label']} />
      <RTOCountryPage />
    </>
  );
});
