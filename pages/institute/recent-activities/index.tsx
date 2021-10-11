import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteLayoutComposed from '../../../modules/institute/InstituteLayoutComposed';

const RecentActivities = asyncComponent(
  () => import('../../../modules/institute/recent-activities'),
);

export default InstituteLayoutComposed(() => {
  return <RecentActivities />;
});
