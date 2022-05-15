import {RecoilRoot} from 'recoil';
import dynamic from 'next/dynamic';
const DynamicComponentWithNoSSR = dynamic(
  () => import('./editor/CertificateView'),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
      <RecoilRoot>
        <DynamicComponentWithNoSSR />
      </RecoilRoot>
    </div>
  );
}
