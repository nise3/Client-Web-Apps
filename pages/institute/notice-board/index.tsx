import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const YouthNoticeBoardPage = asyncComponent(
  () => import('../../../modules/youth/noticeBoard/YouthNoticeBoard'),
);
export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.notice_board'] as string} />
      <YouthNoticeBoardPage />
    </>
  );
});
