import asyncComponent from '../../../@crema/utility/asyncComponent';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';

const NASCIBMemberRegistrationPaymentSuccessPage = asyncComponent(
  () =>
    import('../../../modules/industry/NASCIBMemberRegistrationPaymentSuccess'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <NASCIBMemberRegistrationPaymentSuccessPage />
    </>
  );
});
