import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const RecentActivities = asyncComponent(
  () => import('../../../modules/institute/recent-activities'),
);

export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.recent_activities']} />
      <RecentActivities />;
    </>
  );
});
