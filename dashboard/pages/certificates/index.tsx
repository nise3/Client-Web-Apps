import dynamic from 'next/dynamic';
import DefaultPage from '../../../@softbd/layouts/hoc/DefaultPage';

const Editor = dynamic(
  () => import('../../../modules/dashboard/certificates/Editor'),
  {
    ssr: false,
  },
);
export default DefaultPage(() => {
  return <Editor />;
});
