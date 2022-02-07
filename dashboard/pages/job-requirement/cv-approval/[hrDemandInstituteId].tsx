import React from 'react';
import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';

const CVJobApprovalPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/jobRequirements/InstituteProvidedCVList'
    ),
);
export default DashboardPage(() => {
  return (
    <>
      <PageMeta title='CV approval' />
      <CVJobApprovalPage />
    </>
  );
});
