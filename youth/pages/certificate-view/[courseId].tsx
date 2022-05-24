import dynamic from 'next/dynamic';
import { useIntl } from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
const CertificateView = dynamic(
  () => import('../../../modules/dashboard/certificate/Certificate'),
  {
    ssr: false,
  },
);

const CertificateEditorPage = YouthFrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.certificate']} />
      <CertificateView />
    </>
  );
});

export default CertificateEditorPage;
