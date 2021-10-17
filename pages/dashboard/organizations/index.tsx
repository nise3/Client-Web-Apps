import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@softbd/layouts/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const OrganizationPage = asyncComponent(
  () => import('../../../modules/dashboard/organizations/OrganizationPage'),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['organization.label']} />
      <OrganizationPage />
    </>
  );
});
