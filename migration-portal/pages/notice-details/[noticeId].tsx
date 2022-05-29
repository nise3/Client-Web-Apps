import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import MigrationPortalDefaultFrontPage from '../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage';

const MigrationPortalNoticeDetailsPage = asyncComponent(
  () => import('../../../modules/youth/noticeDetails'),
);
export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.notice_details'] as string} />
      <MigrationPortalNoticeDetailsPage />
    </>
  );
});
