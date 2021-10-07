import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const PermissionSubGroupsPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/permissionSubGroups/PermissionSubGroupPage'
    ),
);
export default AppPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['permission_sub_group.label']} />
      <PermissionSubGroupsPage />
    </>
  );
});
