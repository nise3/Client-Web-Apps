import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';

const OrganizationUnitPage = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/organization-units/OrganizationUnitPage'
    ),
);
export default AppPage(() => (
  <>
    <PageMeta title='Organization Unit' />
    <OrganizationUnitPage />
  </>
));
