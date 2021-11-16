import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import messages from '../../../@crema/services/db/messages/messages';
import PageMeta from '../../../@crema/core/PageMeta';

const EventCalendarPage = asyncComponent(
  () => import('../../../modules/dashboard/events/EventCalendar'),
);
// export default DashboardPage(() => {
//   const {messages} = useIntl();
//   const router = useRouter();
//   // console.log(router.query);
  
//   return (
//     <>
//       <PageMeta title={messages['menu.faq'] as string} />
//       <EventCalendarPage calendarFor="youth" />
//     </>
//   );
// });

export default YouthFrontPage(() => {
  return (
    <>
      <PageMeta title={messages['menu.faq'] as string} />
      <EventCalendarPage calendarFor="youth" />
    </>
  );
});