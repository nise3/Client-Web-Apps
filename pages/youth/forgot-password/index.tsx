import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.forgot_password'] as string} />
    </>
  );
});
