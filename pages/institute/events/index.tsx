import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import messages from '../../../@crema/services/db/messages/messages';
import PageMeta from '../../../@crema/core/PageMeta';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const EventCalendarPage = asyncComponent(
  () => import('../../../modules/dashboard/events/EventCalendar'),
);
// export default DashboardPage(() => {
//   const {messages} = useIntl();
//   const router = useRouter();
//   // console.log(router.query);

//   return (
//     <>
//       <PageMeta title={messages['menu.faqs'] as string} />
//       <EventCalendarPage calendarFor="youth" />
//     </>
//   );
// });

export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={messages['menu.faqs'] as string} />
      <EventCalendarPage calendarFor='institute' />
    </>
  );
});
