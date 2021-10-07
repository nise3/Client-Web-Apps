import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteLayoutComposed from '../../../modules/institute/InstituteLayoutComposed';
import React from 'react';

const InstituteContact = asyncComponent(() => import('../../../modules/institute/contact'));

export default InstituteLayoutComposed(() => {
  return <InstituteContact />;
});
