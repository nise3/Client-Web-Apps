import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_BANNERS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createSliderBanner = async (data: any) => {
  try {
    let response: any = await apiPost(API_BANNERS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateSliderBanner = async (bannerId: number, data: any) => {
  try {
    let response: any = await apiPut(API_BANNERS + '/' + bannerId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteSliderBanner = async (bannerId: number) => {
  try {
    let response: any = await apiDelete(API_BANNERS + '/' + bannerId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
