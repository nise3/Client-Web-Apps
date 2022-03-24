import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const UpdatePasswordPage = asyncComponent(
  () => import('../../../modules/youth/updatePassword'),
);
export default YouthFrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['update_password.label']} />
      <UpdatePasswordPage />
    </>
  );
});
