import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const Nise3NoticeDetailsPage = asyncComponent(
  () => import('../../../modules/youth/noticeDetails'),
);
export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.notice_details'] as string} />
      <Nise3NoticeDetailsPage />
    </>
  );
});
