import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';

const InstituteGallery = asyncComponent(
  () => import('../../../modules/institute/gallery'),
);

export default InstituteDefaultFrontPage(() => {
  return <InstituteGallery />;
});
