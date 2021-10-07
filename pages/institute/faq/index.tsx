import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteLayoutComposed from '../../../modules/institute/InstituteLayoutComposed';
import React from 'react';

const InstituteFAQ = asyncComponent(() => import('../../../modules/institute/faq'));

export default InstituteLayoutComposed(() => {
  return <InstituteFAQ />;
});
