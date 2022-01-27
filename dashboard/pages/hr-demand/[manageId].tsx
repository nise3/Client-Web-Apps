import React from 'react';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';

const HumanResourceDemandManagePage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/humanResourceDemands/HumanResourceDemandMangePopup'
    ),
);
export default DashboardPage(() => {
  return (
    <>
      <PageMeta title='hr_demand.label' />
      <HumanResourceDemandManagePage />
    </>
  );
});
