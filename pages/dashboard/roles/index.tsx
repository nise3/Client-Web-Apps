import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@softbd/layouts/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const RolePage = asyncComponent(
  () => import('../../../modules/dashboard/roles/RolePage'),
);
export default AppPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['role.label']} />
      <RolePage />
    </>
  );
});
