import moment from 'moment';
import {DATE_FORMAT, TIME_FORMAT} from '../../@softbd/utilities/DateTime';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {ICalendar} from '../../shared/Interface/common.interface';
import {View} from 'react-big-calendar';

export const addStartEndPropsToList = (events: ICalendar[]) => {
  try {
    if (events) {
      events.forEach((element: any) => {
        element['start'] = element.start_date;
        element['end'] = element.start_date;
      });
    }
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const formatDateTime = (itemData: ICalendar) => {
  try {
    if (itemData) {
      itemData.start_date = moment(itemData.start).format(DATE_FORMAT);
      itemData.end_date = moment(itemData.end).format(DATE_FORMAT);
      itemData.start_time = moment(itemData.start).format(TIME_FORMAT);
      itemData.end_time = moment(itemData.end).format(TIME_FORMAT);
    }
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getNavigationFilter = (event: any, prev: any) => {
  const monthNumber = moment(event).month() + 1;
  const yearNumber = moment(event).year();
  if (prev.type === 'day'){
    return {...prev, ...{ month: monthNumber, date: moment(event).format('YYYY-MM-DD'), year: yearNumber }}
  }
  return {...prev, ...{ month: monthNumber, year: yearNumber }};
}
export const getCalenderViewFilter = (view: View, prev: any) => {
  return {...prev, ...{type: view === 'agenda' ? 'schedule' : view}};
}
export const eventsDateTimeMap = (events: ICalendar[]) => {
  return (events || []).map((e: any) => {
    const start = e?.start_time ? `${e?.start}T${e.start_time}` : `${e?.start}`;
    const end = e?.end_time ? `${e?.end}T${e.end_time}` : `${e?.end}`;
    try {
      e.start = new Date(start);
    } catch (e: any) {
      e.start = new Date();
    }
    try {
      e.end = new Date(end);
    } catch (e: any) {
      e.end = new Date();
    }
    return e;
  });
};
