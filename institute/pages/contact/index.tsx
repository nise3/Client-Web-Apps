import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';

const InstituteContact = asyncComponent(
  () => import('../../../modules/institute/contact'),
);

export default InstituteDefaultFrontPage(() => {
  return <InstituteContact />;
});
