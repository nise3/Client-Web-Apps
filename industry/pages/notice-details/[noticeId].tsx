import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';

const NoticeDetails = asyncComponent(
  () => import('../../../modules/industry/noticeDetails/index'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.notice_details']} />
      <NoticeDetails />
    </>
  );
});
