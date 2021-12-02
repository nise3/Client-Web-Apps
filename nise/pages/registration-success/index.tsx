import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import DefaultPage from '../../../@softbd/layouts/hoc/DefaultPage';

const RegistrationSuccessPage = asyncComponent(
  () => import('../../../modules/registrationSuccess'),
);
export default DefaultPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.registration_success'] as string} />
      <RegistrationSuccessPage />
    </>
  );
});
