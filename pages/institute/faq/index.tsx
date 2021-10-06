import asyncComponent from '../../../@crema/utility/asyncComponent';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';

const InstituteFAQ = asyncComponent(() => import('../../../modules/institute/faq'));

export default FrontPage(() => {
  return <InstituteFAQ />;
});
