import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import InstituteFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const InstituteNoticeDetailsPage = asyncComponent(
  () => import('../../../modules/youth/noticeDetails'),
);
export default InstituteFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.notice_details'] as string} />
      <InstituteNoticeDetailsPage />
    </>
  );
});
