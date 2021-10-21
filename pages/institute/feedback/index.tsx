import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';

const InstituteFeedback = asyncComponent(
  () => import('../../../modules/institute/feedback'),
);

export default InstituteDefaultFrontPage(() => {
  return <InstituteFeedback />;
});
