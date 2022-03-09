import IndustryDefaultFrontPage from '../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Industry = asyncComponent(() => import('../../modules/industry'));

export default IndustryDefaultFrontPage(() => {
  return <Industry />;
});
