import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const AboutUs = asyncComponent(
  () => import('../../../modules/industry/about-us/index'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <AboutUs />
    </>
  );
});
