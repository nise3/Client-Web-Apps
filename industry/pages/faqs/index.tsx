import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';

const IndustryAssociationFAQ = asyncComponent(
  () => import('../../../modules/institute/faq'),
);

export default IndustryDefaultFrontPage(() => {
  return <IndustryAssociationFAQ />;
});
