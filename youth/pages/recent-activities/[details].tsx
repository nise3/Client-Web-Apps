import PageMeta from '../../../@crema/core/PageMeta';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';

const RecentActivitiesDetails = asyncComponent(
  () =>
    import(
      '../../../modules/institute/recent-activities/RecentActivitiesDetails'
    ),
);

export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.recent_activities']} />
      <RecentActivitiesDetails />
    </>
  );
});
