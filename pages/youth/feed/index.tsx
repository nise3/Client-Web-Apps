import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const YouthFeedPage = asyncComponent(
  () => import('../../../modules/youth/feed'),
);
export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={'Youth Feed Page'} />
      <YouthFeedPage />
    </>
  );
});
