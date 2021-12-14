import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const MemberListPage = asyncComponent(
  () => import('../../../modules/industry/memberList'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.member_list']} />
      <MemberListPage />
    </>
  );
});
