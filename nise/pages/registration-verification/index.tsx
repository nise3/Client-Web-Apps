import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import DefaultPage from '../../../@softbd/layouts/hoc/DefaultPage';
import AccessibilityToolbar from '../../../@softbd/components/accessibility/AccessibilityToolbar';

const RegistrationVerificationPage = asyncComponent(
  () => import('../../../modules/registrationVerification'),
);
export default DefaultPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.verify'] as string} />
      <AccessibilityToolbar />
      <RegistrationVerificationPage />
    </>
  );
});
