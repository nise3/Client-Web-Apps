import React from 'react';
import {useIntl} from 'react-intl';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../../@crema/core/PageMeta';
import asyncComponent from '../../../../@crema/utility/asyncComponent';

const FourIRInitativeUserPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/4IRInitativeUser/FourIRInitativeUserPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['4IR_steps.label'] as string} />
      <FourIRInitativeUserPage />
    </>
  );
});
