import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_CURRICULUM} from '../../@softbd/common/apiRoutes';

export const getAllCurriculums = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_CURRICULUM, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getCurriculum = async (currId: number) => {
  try {
    let response: any = await apiGet(API_4IR_CURRICULUM + '/' + currId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createCurriculum = async (data: any) => {
  try {
    let response: any = await apiPost(API_4IR_CURRICULUM, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCurriculum = async (currId: number, data: any) => {
  try {
    let response: any = await apiPut(API_4IR_CURRICULUM + '/' + currId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCurriculum = async (currId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_CURRICULUM + '/' + currId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
