import asyncComponent from '../../../@crema/utility/asyncComponent';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';

const StaticContent = asyncComponent(() => import('../../../modules/sc'));

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <StaticContent />
    </>
  );
});
