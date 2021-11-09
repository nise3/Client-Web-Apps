import React from 'react';
import {Calendar, CalendarProps} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface IMyCalendar extends CalendarProps {}

const MyCalendar = ({events, ...rest}: IMyCalendar) => {
  
  
  return (
    <div>
      <Calendar
        events={events}
        startAccessor='start'
        endAccessor='end'
        {...rest}
      />
    </div>
  );
};

export default MyCalendar;
