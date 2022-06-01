import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const RecentActivities = asyncComponent(
  () => import('../../../modules/institute/recent-activities'),
);

export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.recent_activities']} />
      <RecentActivities />
    </>
  );
});
