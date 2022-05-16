import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import {useIntl} from 'react-intl';

const YouthFeedPage = asyncComponent(
  () => import('../../../modules/youth/feed'),
);
export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['youth_feed.label']} />
      <YouthFeedPage />
    </>
  );
});
