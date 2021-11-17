import asyncComponent from '../../@crema/utility/asyncComponent';
import PageMeta from '../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';

const EventCalendarPage = asyncComponent(
  () => import('../../modules/dashboard/events/EventCalendar'),
);
export default NiseFrontPage(() => {
  const {messages} = useIntl();
  // const router = useRouter();
  // console.log(router.query);
  
  return (
    <>
      <PageMeta title={messages['menu.faq'] as string} />
      {/* <EventCalendarPage routeQeury={router.query}  /> */}
      <EventCalendarPage calendarFor="nise"/>
    </>
  );
});
