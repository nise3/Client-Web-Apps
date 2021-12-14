import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Notice = asyncComponent(
  () => import('../../../modules/industry/notice/index'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <Notice />
    </>
  );
});
