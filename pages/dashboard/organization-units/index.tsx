import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';

const OrganizationUnitPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/organizationUnits/OrganizationUnitPage'
    ),
);
export default AppPage(() => (
  <>
    <PageMeta title='Organization Unit' />
    <OrganizationUnitPage />
  </>
));
