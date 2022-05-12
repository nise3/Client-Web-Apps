import dynamic from 'next/dynamic';
import { useIntl } from 'react-intl';
import PageMeta from '../../../../@crema/core/PageMeta';
import AuthenticatedBlankPage from './../../../../@softbd/layouts/hoc/AuthenticatedBlankPage';
const CertificateEditor = dynamic(
  () =>
    import('./../../../../modules/dashboard/certificate/CertificateEditorPage'),
  {
    ssr: false,
  },
);

const CertificateEditorPage = AuthenticatedBlankPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.certificate']} />
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}>
        <div className='loader'>
          <CertificateEditor />
        </div>
      </div>
    </>
  );
});

export default CertificateEditorPage;
