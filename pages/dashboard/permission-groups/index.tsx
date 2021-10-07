import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const PermissionGroupsPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/permissionGroups/PermissionGroupPage'),
);
export default AppPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['permission-group.label']} />
      <PermissionGroupsPage />
    </>
  );
});
