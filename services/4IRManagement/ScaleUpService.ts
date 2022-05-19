import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_SCALE_UP} from '../../@softbd/common/apiRoutes';
import {IScaleUp} from '../../shared/Interface/4IR.interface';

export const getAllScaleUps = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_SCALE_UP, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getScaleUp = async (scaleUpId: number) => {
  try {
    let response: any = await apiGet(API_4IR_SCALE_UP + '/' + scaleUpId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createScaleUp = async (data: IScaleUp) => {
  try {
    let response: any = await apiPost(API_4IR_SCALE_UP, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateScaleUp = async (scaleUpId: number, data: IScaleUp) => {
  try {
    let response: any = await apiPut(API_4IR_SCALE_UP + '/' + scaleUpId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteScaleUp = async (scaleUpId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_SCALE_UP + '/' + scaleUpId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
