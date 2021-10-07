import asyncComponent from '../../../../@crema/utility/asyncComponent';
import AppPage from '../../../../@crema/hoc/AppPage';
import PageMeta from '../../../../@crema/core/PageMeta';
import React from 'react';

const OrganizationUnitHierarchyPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/organizationUnits/OrganizationUnitHierarchyPage'
    ),
);
export default AppPage(() => {
  return (
    <>
      <PageMeta title='Organization Unit Hierarchy' />
      <OrganizationUnitHierarchyPage />
    </>
  );
});
