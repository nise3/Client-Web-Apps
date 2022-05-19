import asyncComponent from '../../../@crema/utility/asyncComponent';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';

const NASCIBMemberRegistrationPaymentSuccessPage = asyncComponent(
  () =>
    import('../../../modules/industry/NASCIBMemberRegistrationPaymentSuccess'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.registration']} />
      <NASCIBMemberRegistrationPaymentSuccessPage />
    </>
  );
});
