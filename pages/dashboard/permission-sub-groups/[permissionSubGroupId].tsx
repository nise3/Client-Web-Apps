import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const AssignPermissionToPermissionSubGroupPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/permissionSubGroups/AssignPermissionToPermissionSubGroupPage'
    ),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.assign_permission']} />
      <AssignPermissionToPermissionSubGroupPage />
    </>
  );
});
