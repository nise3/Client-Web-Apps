import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const MemberRegistrationPage = asyncComponent(
  () => import('../../../modules/industry/memberRegistration'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <MemberRegistrationPage />
    </>
  );
});
