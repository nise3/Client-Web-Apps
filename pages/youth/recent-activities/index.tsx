import asyncComponent from '../../../@crema/utility/asyncComponent';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';

const RecentActivities = asyncComponent(
  () => import('../../../modules/institute/recent-activities'),
);

export default YouthFrontPage(() => {
  return <RecentActivities />;
});
