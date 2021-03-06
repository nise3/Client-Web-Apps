import asyncComponent from '../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';

const CertificatePage = asyncComponent(
  () => import('./../../../modules/dashboard/certificate/CertificatePage'),
);

export default DashboardPage(() => {
  return (
    <>
      <CertificatePage />
    </>
  );
});
