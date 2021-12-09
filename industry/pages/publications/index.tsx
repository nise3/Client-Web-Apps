import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const PublicationPage = asyncComponent(
  () => import('../../../modules/industry/publications'),
);

export default IndustryDefaultFrontPage(() => {
  return <PublicationPage />;
});
