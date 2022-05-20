import React from 'react';
import {useIntl} from 'react-intl';
import DashboardPage from '../../../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../../../@crema/core/PageMeta';
import asyncComponent from '../../../../../@crema/utility/asyncComponent';

const FourIRInitiativesPage = asyncComponent(
  () =>
    import(
      '../../../../../modules/dashboard/4IRInitiatives/FourIRInitiativesPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['menu.initiative']} />
      <FourIRInitiativesPage />
    </>
  );
});
