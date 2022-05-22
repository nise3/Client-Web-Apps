import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const ChoosePaymentMethodPage = asyncComponent(
  () => import('../../../modules/industry/choosePaymentMethod'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.registration']} />
      <ChoosePaymentMethodPage />
    </>
  );
});
