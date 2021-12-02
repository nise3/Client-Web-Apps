import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const SliderBannerPage = asyncComponent(
  () => import('../../../modules/dashboard/sliderBanners/SliderBannerPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['banners.label'] as string} />
      <SliderBannerPage />
    </>
  );
});
