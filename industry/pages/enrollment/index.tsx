import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const Enrollment = asyncComponent(
  () => import('../../../modules/industry/enrollment/index'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <Enrollment />
    </>
  );
});
