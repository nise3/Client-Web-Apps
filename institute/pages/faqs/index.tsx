import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';

const InstituteFAQ = asyncComponent(
  () => import('../../../modules/institute/faq'),
);

export default InstituteDefaultFrontPage(() => {
  return <InstituteFAQ />;
});
