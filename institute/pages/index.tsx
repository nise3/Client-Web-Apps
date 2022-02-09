import asyncComponent from '../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';

const Institute = asyncComponent(() => import('../../modules/institute'));

export default InstituteDefaultFrontPage(() => {
  return <Institute />;
});
