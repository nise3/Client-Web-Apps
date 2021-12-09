import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const NoticeDetails = asyncComponent(
  () => import('../../../modules/industry/noticeDetails/index'),
);

export default IndustryDefaultFrontPage(() => {
  return (
    <>
      <NoticeDetails />
    </>
  );
});
