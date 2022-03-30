import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';

const HumanResourceDemandManagePage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/humanResourceDemands/HumanResourceDemandCvView'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['hr_demand.label'] as string} />
      <HumanResourceDemandManagePage />
    </>
  );
});
