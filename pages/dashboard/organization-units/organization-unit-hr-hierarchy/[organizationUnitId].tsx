import asyncComponent from '../../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../../@crema/core/PageMeta';
import React from 'react';

const OrganizationUnitHierarchyPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/organizationUnits/OrganizationUnitHierarchyPage'
    ),
);
export default DashboardPage(() => {
  return (
    <>
      <PageMeta title='Organization Unit Hierarchy' />
      <OrganizationUnitHierarchyPage />
    </>
  );
});
