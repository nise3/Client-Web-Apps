import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const RecentActivities = asyncComponent(
  () => import('../../modules/institute/recent-activities'),
);

export default NiseFrontPage(() => {
  return <RecentActivities />;
});
