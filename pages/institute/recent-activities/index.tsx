import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const RecentActivities = asyncComponent(
  () => import('../../../modules/institute/recent-activities'),
);

export default InstituteDefaultFrontPage(() => {
  return <RecentActivities />;
});
