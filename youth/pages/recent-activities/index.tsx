import asyncComponent from '../../../@crema/utility/asyncComponent';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const RecentActivities = asyncComponent(
  () => import('../../../modules/institute/recent-activities'),
);

export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.recent_activities']} />
      <RecentActivities />
    </>
  );
});
