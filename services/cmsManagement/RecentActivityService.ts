import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_RECENT_ACTIVITIES} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createRecentActivities = async (data: any) => {
  try {
    let response: any = await apiPost(API_RECENT_ACTIVITIES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRecentActivity = async (
  recentActivityId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_RECENT_ACTIVITIES + '/' + recentActivityId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteRecentActivity = async (recentActivityId: number) => {
  try {
    let response: any = await apiDelete(
      API_RECENT_ACTIVITIES + '/' + recentActivityId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
