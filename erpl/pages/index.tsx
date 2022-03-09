import ErplDefaultFrontPage from '../../@softbd/layouts/hoc/ErplDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Industry = asyncComponent(() => import('../../modules/industry'));

export default ErplDefaultFrontPage(() => {
  return <Industry />;
});
