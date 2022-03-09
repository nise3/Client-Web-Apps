import ErplDefaultFrontPage from '../../../@softbd/layouts/hoc/ErplDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const StaticContent = asyncComponent(() => import('../../../modules/erpl/sc'));

export default ErplDefaultFrontPage(() => {
  return (
    <>
      <StaticContent />
    </>
  );
});
