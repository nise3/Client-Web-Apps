import asyncComponent from '../../../@crema/utility/asyncComponent';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';

const InstituteGallery = asyncComponent(() => import('../../../modules/institute/gallery'));

export default FrontPage(() => {
  return <InstituteGallery />;
});
