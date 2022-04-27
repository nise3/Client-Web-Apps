import asyncComponent from '../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const CertificatePage = asyncComponent(
  () => import('./../../../modules/dashboard/certificate/CertificatePage'),
);

export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <CertificatePage />
    </>
  );
});
