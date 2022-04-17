import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_CBLM} from '../../@softbd/common/apiRoutes';

export const getAllCBLMS = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_CBLM, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getCBLM = async (projectId: number) => {
  try {
    let response: any = await apiGet(API_4IR_CBLM + '/' + projectId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createCBLM = async (data: any) => {
  try {
    let response: any = await apiPost(API_4IR_CBLM, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCBLM = async (id: number, data: any) => {
  try {
    let response: any = await apiPut(API_4IR_CBLM + '/' + id, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCBLM = async (id: number) => {
  try {
    let response: any = await apiDelete(API_4IR_CBLM + '/' + id);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
