import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const StaticContent = asyncComponent(() => import('../../../modules/sc'));

export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <StaticContent />
    </>
  );
});
