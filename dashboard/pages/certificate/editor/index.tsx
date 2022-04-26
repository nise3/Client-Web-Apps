import dynamic from 'next/dynamic';

const CertificateEditorPage = dynamic(
  () =>
    import('./../../../../modules/dashboard/certificate/CertificateEditorPage'),
  {
    ssr: false,
  },
);

export default () => <CertificateEditorPage />;
