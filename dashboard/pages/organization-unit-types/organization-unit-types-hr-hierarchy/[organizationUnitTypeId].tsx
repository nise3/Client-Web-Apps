import React from 'react';
import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';

const OrganizationUnitTypeHierarchyPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/organizationUnitTypes/OrganizationUnitTypeHierarchy'
    ),
);
export default DashboardPage(() => {
  return (
    <>
      <PageMeta title='Organization Unit Types Chart' />
      <OrganizationUnitTypeHierarchyPage />
    </>
  );
});
