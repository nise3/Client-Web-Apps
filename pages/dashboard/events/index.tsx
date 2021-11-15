import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const EventCalendarPage = asyncComponent(
  () => import('../../../modules/dashboard/events/EventCalendar'),
);
export default DashboardPage(() => {
  const {messages} = useIntl();
  // const router = useRouter();
  // console.log(router.query);
  
  return (
    <>
      <PageMeta title={messages['menu.faq'] as string} />
      {/* <EventCalendarPage routeQeury={router.query}  /> */}
      <EventCalendarPage calendarFor="nise" />
    </>
  );
});
