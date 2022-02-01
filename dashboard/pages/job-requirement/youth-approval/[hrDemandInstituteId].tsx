import React from 'react';
import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';

const YouthJobApprovalPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/jobRequirements/InstituteProvidedYouthList'
    ),
);
export default DashboardPage(() => {
  return (
    <>
      <PageMeta title='youth job approval' />
      <YouthJobApprovalPage />
    </>
  );
});
