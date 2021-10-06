import asyncComponent from '../../@crema/utility/asyncComponent';
import FrontPage from '../../@crema/hoc/FrontPage';
import React from 'react';

const Institute = asyncComponent(() => import('../../modules/institute'));

export default FrontPage(() => {
  return <Institute />;
});
