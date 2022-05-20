import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_CS} from '../../@softbd/common/apiRoutes';

export const getAllCS = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_CS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getCS = async (csId: number) => {
  try {
    let response: any = await apiGet(API_4IR_CS + '/' + csId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createCS = async (data: any) => {
  try {
    let response: any = await apiPost(API_4IR_CS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCS = async (csId: number, data: any) => {
  try {
    let response: any = await apiPut(API_4IR_CS + '/' + csId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCS = async (csId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_CS + '/' + csId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
