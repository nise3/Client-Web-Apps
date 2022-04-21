import dynamic from 'next/dynamic';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import DefaultPage from '../../../@softbd/layouts/hoc/DefaultPage';

const NoSSRComponent = dynamic(
  () => import('../../../modules/dashboard/certificates/component'),
  {
    ssr: false,
  },
);
export default DefaultPage(() => {
  return <NoSSRComponent />;
});
