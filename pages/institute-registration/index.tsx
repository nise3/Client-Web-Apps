import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const InstituteRegistrationPage = asyncComponent(
  () => import('../../modules/instituteRegistration/InstituteRegistration'),
);
export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.registration'] as string} />
      <InstituteRegistrationPage />
    </>
  );
});
