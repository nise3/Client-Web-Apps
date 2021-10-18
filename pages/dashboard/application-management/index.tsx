import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const ApplicationManagementPage = asyncComponent(
  () => import('../../../modules/dashboard/applicationManagement/ApplicationManagementPage'),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['applicationManagement.label'] as string} />
      <ApplicationManagementPage />
    </>
  );
});
