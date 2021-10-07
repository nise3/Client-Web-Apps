import asyncComponent from '../../@crema/utility/asyncComponent';
// import FrontPage from '../../@crema/hoc/FrontPage';
import InstituteLayoutComposed from '../../modules/institute/InstituteLayoutComposed';
import React from 'react';

const Institute = asyncComponent(() => import('../../modules/institute'));

export default InstituteLayoutComposed(() => {
  return <Institute />;
});
