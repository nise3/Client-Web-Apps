import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import DefaultPage from '../../@softbd/layouts/hoc/DefaultPage';

const OrganizationRegistrationPage = asyncComponent(
  () =>
    import('../../modules/organizationRegistration/OrganizationRegistration'),
);
export default DefaultPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.registration'] as string} />
      <OrganizationRegistrationPage />
    </>
  );
});
