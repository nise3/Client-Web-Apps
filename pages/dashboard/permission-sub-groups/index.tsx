import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const PermissionSubGroupsPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/permissionSubGroups/PermissionSubGroupPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['permission_sub_group.label']} />
      <PermissionSubGroupsPage />
    </>
  );
});
