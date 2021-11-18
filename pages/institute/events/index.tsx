import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import messages from '../../../@crema/services/db/messages/messages';
import PageMeta from '../../../@crema/core/PageMeta';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';

const EventCalendarViewPage = asyncComponent(
  () => import('../../../modules/dashboard/events/EventCalendarView'),
);

export default InstituteDefaultFrontPage(() => {
  return (
    <>
      <PageMeta title={messages['menu.faq'] as string} />
      <EventCalendarViewPage calendarFor='institute' />
    </>
  );
});
