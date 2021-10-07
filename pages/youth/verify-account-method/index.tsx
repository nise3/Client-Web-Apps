import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthVerifyAccountMethodPage = asyncComponent(
  () =>
    import(
      '../../../modules/youth/verifyAccountMethod/YouthVerifyAccountMethod'
    ),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.verify_account'] as string} />
      <YouthVerifyAccountMethodPage />
    </>
  );
});
