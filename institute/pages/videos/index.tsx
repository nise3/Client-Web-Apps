import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';

const InstituteVideos = asyncComponent(
  () => import('../../../modules/institute/videos'),
);

export default InstituteDefaultFrontPage(() => {
  return <InstituteVideos />;
});
