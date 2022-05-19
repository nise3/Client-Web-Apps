import asyncComponent from '../../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../../@softbd/layouts/hoc/DashboardPage';
import PageMeta from '../../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';

const OrganizationUnitHierarchyPage = asyncComponent(
  () =>
    import(
      '../../../../modules/dashboard/organizationUnits/OrganizationUnitHierarchyPage'
    ),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['organization_unit.label']} />
      <OrganizationUnitHierarchyPage />
    </>
  );
});
