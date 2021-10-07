import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteLayoutComposed from '../../../modules/institute/InstituteLayoutComposed';
import React from 'react';

const InstituteFeedback = asyncComponent(() => import('../../../modules/institute/feedback'));

export default InstituteLayoutComposed(() => {
  return <InstituteFeedback />;
});
