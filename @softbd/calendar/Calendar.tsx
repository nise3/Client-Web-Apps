import React from 'react';
import moment from 'moment';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={[
        {
          start: moment().toDate(),
          end: moment().add(1, 'days').toDate(),
          title: 'Some title',
        },
      ]}
      // views={['month', 'day', 'agenda']}
      startAccessor='start'
      endAccessor='end'
      style={{height: '100vh'}}
    />
  </div>
);

export default MyCalendar;
