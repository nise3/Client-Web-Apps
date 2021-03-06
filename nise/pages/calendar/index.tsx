import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';
import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';

const EventCalendarViewPage = asyncComponent(
  () => import('../../../modules/events/EventCalendarView'),
);
export default NiseFrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['menu.calendar'] as string} />
      <EventCalendarViewPage />
    </>
  );
});
