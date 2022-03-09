import ErplDefaultFrontPage from '../../../@softbd/layouts/hoc/ErplDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const OccupationPage = asyncComponent(
  () => import('../../../modules/erpl/occupations'),
);

export default ErplDefaultFrontPage(() => {
  return (
    <>
      <OccupationPage />
    </>
  );
});
