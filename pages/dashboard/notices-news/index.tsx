import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const NoticeOrNews = asyncComponent(
  () => import('../../../modules/dashboard/noticeOrNews/NoticeOrNewsPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['recent_activities.label']} />
      <NoticeOrNews />
    </>
  );
});
