import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthVerifyAccountSelectPage = asyncComponent(
  () =>
    import(
      '../../../modules/youth/verifyAccountSelect/YouthVerifyAccountSelect'
    ),
);
export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.verify_account'] as string} />
      <YouthVerifyAccountSelectPage />
    </>
  );
});
