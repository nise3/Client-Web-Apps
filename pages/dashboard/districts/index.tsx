import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@softbd/layouts/hoc/AppPage';
import React from 'react';
import {useIntl} from 'react-intl';

const DistrictsPage = asyncComponent(
  () => import('../../../modules/dashboard/districts/DistrictsPage'),
);
export default AppPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['districts.label']} />
      <DistrictsPage />
    </>
  );
});
