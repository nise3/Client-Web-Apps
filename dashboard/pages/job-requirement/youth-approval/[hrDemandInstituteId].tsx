import React from 'react';
import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';

const YouthJobApprovalYouthListPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/jobRequirements/InstituteProvidedYouthList'
    ),
);
export default DashboardPage(() => {
  return (
    <>
      <PageMeta title='Youth approval' />
      <YouthJobApprovalYouthListPage />
    </>
  );
});
