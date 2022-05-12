import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const JobCircularPage = asyncComponent(
  () => import('../../../modules/industry/jobCircular'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <JobCircularPage />
    </>
  );
});
