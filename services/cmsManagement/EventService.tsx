import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_CALENDAR_EVENTS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const deleteEvent = async (eventId: number) => {
  try {
    let response: any = await apiDelete(API_CALENDAR_EVENTS + '/' + eventId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createCalendar = async (data: Calendar) => {
  try {
    let response: any = await apiPost(API_CALENDAR_EVENTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCalendar = async (eventId: number, data: Calendar) => {
  try {
    let response: any = await apiPut(API_CALENDAR_EVENTS + '/' + eventId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
