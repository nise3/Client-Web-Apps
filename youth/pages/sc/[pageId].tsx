import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const StaticContent = asyncComponent(() => import('../../../modules/sc'));

export default YouthFrontPage(() => {
  return (
    <>
      <StaticContent />
    </>
  );
});
