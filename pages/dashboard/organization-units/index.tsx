import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';

const OrganizationUnitPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/organizationUnits/OrganizationUnitPage'
    ),
);
export default DashboardPage(() => (
  <>
    <PageMeta title='Organization Unit' />
    <OrganizationUnitPage />
  </>
));
