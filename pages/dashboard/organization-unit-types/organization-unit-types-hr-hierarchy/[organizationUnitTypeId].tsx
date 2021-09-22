import React from 'react';
import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import AppPage from '../../../../@crema/hoc/AppPage';

const OrganizationUnitTypeHierarchyPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/organization-unit-types/OrganizationUnitTypeHierarchy'
    ),
);
export default AppPage(() => {
  return (
    <>
      <PageMeta title='Organization Unit Types Chart' />
      <OrganizationUnitTypeHierarchyPage />
    </>
  );
});
