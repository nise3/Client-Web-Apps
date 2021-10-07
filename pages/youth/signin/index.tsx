import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthSignInPage = asyncComponent(
  () => import('../../../modules/youth/signin/YouthSignIn'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.signIn'] as string} />
      <YouthSignInPage />
    </>
  );
});
