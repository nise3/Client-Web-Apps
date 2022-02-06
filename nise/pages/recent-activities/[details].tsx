import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';
import asyncComponent from '../../../@crema/utility/asyncComponent';

const RecentActivitiesDetails = asyncComponent(
  () =>
    import(
      '../../../modules/institute/recent-activities/RecentActivitiesDetails'
    ),
);

export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.recent_activities']} />
      <RecentActivitiesDetails />
    </>
  );
});
