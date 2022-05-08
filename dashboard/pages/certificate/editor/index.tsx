import dynamic from 'next/dynamic';
import PageMeta from '../../../../@crema/core/PageMeta';
import DefaultPage from '../../../../@softbd/layouts/hoc/DefaultPage';
import AuthenticatedBlankPage from './../../../../@softbd/layouts/hoc/AuthenticatedBlankPage';
import {useIntl} from 'react-intl';
const CertificateEditor = dynamic(
  () =>
    import('./../../../../modules/dashboard/certificate/CertificateEditorPage'),
  {
    ssr: false,
  },
);

const CertificateEditorPage = DefaultPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.certificate']} />
      <CertificateEditor />
    </>
  );
});

export default CertificateEditorPage;
