import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const MemberListPage = asyncComponent(
  () => import('../../../modules/dashboard/memberList/MemberListPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['member_management.label'] as string} />
      <MemberListPage />
    </>
  );
});
