import asyncComponent from '../../../@crema/utility/asyncComponent';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';

const InstituteContact = asyncComponent(() => import('../../../modules/institute/contact'));

export default FrontPage(() => {
  return <InstituteContact />;
});
