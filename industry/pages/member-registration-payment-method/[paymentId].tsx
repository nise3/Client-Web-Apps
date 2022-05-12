import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';

const ChoosePaymentMethodPage = asyncComponent(
  () => import('../../../modules/industry/choosePaymentMethod'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <ChoosePaymentMethodPage />
    </>
  );
});
