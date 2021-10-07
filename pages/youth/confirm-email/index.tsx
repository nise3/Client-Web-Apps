import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthConfirmEmailPage = asyncComponent(
  () => import('../../../modules/youth/confirmEmail/YouthConfirmEmail'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.confirm_email'] as string} />
      <YouthConfirmEmailPage />
    </>
  );
});
