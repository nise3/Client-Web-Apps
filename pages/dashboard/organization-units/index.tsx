import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';
const OrganizationUnitPage = asyncComponent(
  () =>
    import('../../../modules/dashboard/organizationUnits/OrganizationUnitPage'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['organization_unit.label']} />
      <OrganizationUnitPage />
    </>
  );
});
