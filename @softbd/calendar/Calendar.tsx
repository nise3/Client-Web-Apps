import React from 'react';
import moment from 'moment';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const events = [
  {
    start: moment().toDate(),
    end: moment().add(1, 'days').toDate(),
    title: 'Some title',
  },
];

const MyCalendar = () => {
  const handleSelect = ({start, end}: any) => {
    const title = window.prompt('New Event name');
    alert(title);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{height: '100vh'}}
        onSelectEvent={(event) => alert(event.title)}
        selectable
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default MyCalendar;
