import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import DefaultPage from '../../@softbd/layouts/hoc/DefaultPage';
import React from 'react';
import {useIntl} from 'react-intl';

const InstituteRegistrationPage = asyncComponent(
  () => import('../../modules/instituteRegistration/InstituteRegistration'),
);
export default DefaultPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.registration'] as string} />
      <InstituteRegistrationPage />
    </>
  );
});
