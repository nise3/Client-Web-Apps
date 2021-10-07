import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteLayoutComposed from '../../../modules/institute/InstituteLayoutComposed';
import React from 'react';

const InstituteGallery = asyncComponent(
  () => import('../../../modules/institute/gallery'),
);

export default InstituteLayoutComposed(() => {
  return <InstituteGallery />;
});
