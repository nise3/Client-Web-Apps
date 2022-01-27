import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const HrDemand = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/humanResourceDemands/HumanResourceDemandPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['hr_demand.label'] as string} />
      <HrDemand />
    </>
  );
});
