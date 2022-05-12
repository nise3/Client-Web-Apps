import React from 'react';
import DefaultPage from '../../@softbd/layouts/hoc/DefaultPage';
import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const ForgetPassword = asyncComponent(
  () => import('../../modules/auth/ForgetPassword'),
);
export default DefaultPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.forgot_password']} />
      <ForgetPassword />
    </>
  );
});
