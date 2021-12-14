import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const MemberDetailsPage = asyncComponent(
  () => import('../../../modules/industry/memberList/MemberDetails'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.member_list']} />
      <MemberDetailsPage />
    </>
  );
});
