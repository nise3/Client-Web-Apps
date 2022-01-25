import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';

const HumanResourceDemandManagePage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/humanResourceDemand/HumanResourceDemandManagePage'
    ),
);
export default DashboardPage(() => {
  return (
    <>
      <PageMeta title='Human Resource Demand' />
      <HumanResourceDemandManagePage />
    </>
  );
});
