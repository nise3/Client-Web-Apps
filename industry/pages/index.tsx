// import FrontPage from '../../@crema/hoc/FrontPage';
import InstituteDefaultFrontPage from '../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Industry = asyncComponent(() => import('../../modules/industry'));

export default InstituteDefaultFrontPage(() => {
  return <Industry/>;
});
