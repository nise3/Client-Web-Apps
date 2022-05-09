import dynamic from 'next/dynamic';
import PageMeta from '../../../../@crema/core/PageMeta';
// import DefaultPage from '../../../../@softbd/layouts/hoc/DefaultPage';
import AuthenticatedBlankPage from '../../../../@softbd/layouts/hoc/AuthenticatedBlankPage';
import {useIntl} from 'react-intl';
const CertificateView = dynamic(
  () => import('../../../../modules/dashboard/certificate/Certificate'),
  {
    ssr: false,
  },
);

const CertificateEditorPage = AuthenticatedBlankPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.certificate']} />
      <CertificateView />
    </>
  );
});

export default CertificateEditorPage;
