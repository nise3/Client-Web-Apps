import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import PageMeta from '../../../@crema/core/PageMeta';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import {useIntl} from 'react-intl';

const EventCalendarViewPage = asyncComponent(
  () => import('../../../modules/dashboard/events/EventCalendarView'),
);

export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.calendar'] as string} />
      {/*@ts-ignore*/}
      <EventCalendarViewPage calendarFor='institute' />
    </>
  );
});
