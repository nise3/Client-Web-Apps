import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

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
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.calender'] as string} />
      <EventCalendarPage calendarFor='youth' />
    </>
  );
});
