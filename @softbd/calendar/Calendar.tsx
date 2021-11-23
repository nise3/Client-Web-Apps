import React from 'react';
import {Calendar, CalendarProps} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useIntl} from 'react-intl';

interface IMyCalendar extends CalendarProps {}

const MyCalendar = ({events, ...rest}: IMyCalendar) => {
  const {messages} = useIntl();
  const lang = {
    today: messages['calendar.today'],
    previous :  messages['common.previous'],
    next :  messages['common.next'],
    agenda: messages['calendar.schedule'],
    month: messages['calendar.month'],
    week: messages['calendar.week'],
    day: messages['calendar.day']
  }

  return (
    <div>
      <Calendar
        events={events}
        messages={lang}
        startAccessor='start'
        endAccessor='end'
        {...rest}
      />
    </div>
  );
};

export default MyCalendar;
