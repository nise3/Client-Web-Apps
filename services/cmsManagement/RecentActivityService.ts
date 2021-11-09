import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {CMS_RECENT_ACTIVITY} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createRecentActivities = async (data: any) => {
  try {
    let response: any = await apiPost(CMS_RECENT_ACTIVITY, data);
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
      CMS_RECENT_ACTIVITY + '/' + recentActivityId,
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
      CMS_RECENT_ACTIVITY + '/' + recentActivityId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
