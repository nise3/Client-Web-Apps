import React from 'react';
import asyncComponent from '../../../../@crema/utility/asyncComponent';
import PageMeta from '../../../../@crema/core/PageMeta';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';

const OrganizationUnitTypeHierarchyPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/organizationUnitTypes/OrganizationUnitTypeHierarchy'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.organization_unit_type']} />
      <OrganizationUnitTypeHierarchyPage />
    </>
  );
});
