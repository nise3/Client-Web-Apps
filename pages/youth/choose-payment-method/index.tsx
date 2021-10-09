import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthPaymentMethodPage = asyncComponent(
  () => import('../../../modules/youth/choosePaymentMethod'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.payment_method'] as string} />
      <YouthPaymentMethodPage />
    </>
  );
});
