import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_SHOWCASE} from '../../@softbd/common/apiRoutes';

export const getAllShowcasing = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_SHOWCASE, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getShowcasing = async (showcasingId: number) => {
  try {
    let response: any = await apiGet(API_4IR_SHOWCASE + '/' + showcasingId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createShowcasing = async (data: any) => {
  try {
    let response: any = await apiPost(API_4IR_SHOWCASE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateShowcasing = async (showcasingId: number, data: any) => {
  try {
    let response: any = await apiPut(
      API_4IR_SHOWCASE + '/' + showcasingId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteShowcasing = async (showcasingId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_SHOWCASE + '/' + showcasingId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
