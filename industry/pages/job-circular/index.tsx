import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const JobCircular = asyncComponent(
  () => import('../../../modules/industry/jobCircular'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <JobCircular />
    </>
  );
});
