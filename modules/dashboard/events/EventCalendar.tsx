import React from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import Calendar from '../../../@softbd/calendar/Calendar';
import moment from 'moment';
import {momentLocalizer} from 'react-big-calendar';

const localizer = momentLocalizer(moment);

const events = [
  {
    start: moment().toDate(),
    end: moment().add(1, 'days').toDate(),
    title: 'Some title',
  },
];

const EventCalendar = () => {
  return (
    <>
      <PageBlock
        title={
          <>
            <IconInstitute /> <IntlMessages id='menu.faq' />
          </>
        }>
        <Calendar events={events} localizer={localizer} />
      </PageBlock>
    </>
  );
};

export default EventCalendar;
