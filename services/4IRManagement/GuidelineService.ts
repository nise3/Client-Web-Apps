import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_GUIDELINE} from '../../@softbd/common/apiRoutes';
import {IGuideline} from '../../shared/Interface/4IR.interface';

export const getAllGuideLines = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_GUIDELINE, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getGuideline = async (guidelineId: number) => {
  try {
    let response: any = await apiGet(API_4IR_GUIDELINE + '/' + guidelineId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createGuideline = async (data: IGuideline) => {
  try {
    let response: any = await apiPost(API_4IR_GUIDELINE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateGuideline = async (taglineId: number, data: IGuideline) => {
  try {
    let response: any = await apiPut(API_4IR_GUIDELINE + '/' + taglineId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteGuideline = async (guidelineId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_GUIDELINE + '/' + guidelineId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
