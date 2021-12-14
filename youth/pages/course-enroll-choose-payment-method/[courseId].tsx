import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import AuthenticatedBlankPage from '../../../@softbd/layouts/hoc/AuthenticatedBlankPage';

const YouthPaymentMethodPage = asyncComponent(
  () => import('../../../modules/youth/choosePaymentMethod'),
);
export default AuthenticatedBlankPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.payment_method'] as string} />
      <YouthPaymentMethodPage />
    </>
  );
});
