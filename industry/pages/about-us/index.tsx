import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const AboutUs = asyncComponent(
  () => import('../../../modules/industry/about-us/index'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.about_us']} />
      <AboutUs />
    </>
  );
});
