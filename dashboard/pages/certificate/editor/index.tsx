import dynamic from 'next/dynamic';
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
  return (
    <>
      <PageMeta title='Certificate' />
      <CertificateEditor />
    </>
  );
});

export default CertificateEditorPage;
