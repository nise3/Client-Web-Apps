import moment from 'moment';
import {DATE_FORMAT, TIME_FORMAT} from '../../@softbd/utilities/DateTime';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {ICalendar} from '../../shared/Interface/common.interface';

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

export const eventsDateTimeMap = (events: ICalendar[]) => {
  try {
    if (events) {
      return events.map((e: any) => {
        const start = e.start_time
          ? `${e.start}T${e.start_time}`
          : `${e.start}`;
        const end = e.end_time ? `${e.end}T${e.end_time}` : `${e.end}`;
        e.start = new Date(start);
        e.end = new Date(end);
        return e;
      });
    }
  } catch (error) {
    catchBlockHandler(error);
  }
};