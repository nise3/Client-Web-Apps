import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_FRONT_END_VIDEO,
  API_FRONT_END_VIDEOS_LIST,
} from '../../@softbd/common/apiRoutes';

export const createVideo = async (data: any) => {
  try {
    let response: any = await apiPost(API_FRONT_END_VIDEOS_LIST, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const updateVideo = async (videoId: number, data: any) => {
  try {
    let response: any = await apiPut(API_FRONT_END_VIDEO, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteVideo = async (videoId: number) => {
  try {
    let response: any = await apiDelete(
      API_FRONT_END_VIDEOS_LIST + '/' + videoId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
