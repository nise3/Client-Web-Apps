import asyncComponent from '../../../@crema/utility/asyncComponent';
import FrontPage from '../../../@crema/hoc/FrontPage';
import React from 'react';

const InstituteFeedback = asyncComponent(() => import('../../../modules/institute/feedback'));

export default FrontPage(() => {
  return <InstituteFeedback />;
});
