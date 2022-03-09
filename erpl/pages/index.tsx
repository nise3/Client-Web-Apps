import ErplDefaultFrontPage from '../../@softbd/layouts/hoc/ErplDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Erpl = asyncComponent(() => import('../../modules/erpl'));

export default ErplDefaultFrontPage(() => {
  return <Erpl />;
});
