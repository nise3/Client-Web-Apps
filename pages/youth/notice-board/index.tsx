import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';
import {useIntl} from 'react-intl';

const YouthNoticeBoardPage = asyncComponent(
  () => import('../../../modules/youth/noticeBoard/YouthNoticeBoard'),
);
export default FrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.notice_board'] as string} />
      <YouthNoticeBoardPage />
    </>
  );
});
