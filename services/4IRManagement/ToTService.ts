import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_ToT} from '../../@softbd/common/apiRoutes';

export const getAllToT = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_ToT, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getToT = async (totId: number) => {
  try {
    let response: any = await apiGet(API_4IR_ToT + '/' + totId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createToT = async (data: any) => {
  try {
    let response: any = await apiPost(API_4IR_ToT, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateToT = async (totId: number, data: any) => {
  try {
    let response: any = await apiPut(API_4IR_ToT + '/' + totId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteToT = async (totId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_ToT + '/' + totId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
