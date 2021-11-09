import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const SliderPage = asyncComponent(
  () => import('../../../modules/dashboard/sliders/SliderPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.slider'] as string} />
      <SliderPage />
    </>
  );
});
