import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';

const YouthFeedPage = asyncComponent(
  () => import('../../modules/youthFeed/YouthFeedPage'),
);
export default FrontPage(() => {
  return (
    <>
      <PageMeta title={'Youth Feed Page'} />
      <YouthFeedPage />
    </>
  );
});
