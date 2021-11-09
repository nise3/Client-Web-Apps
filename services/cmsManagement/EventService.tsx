import {apiDelete} from '../../@softbd/common/api';
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
