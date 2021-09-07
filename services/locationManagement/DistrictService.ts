import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {CORE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/common/helpers';

const API_DISTRICTS = CORE_SERVICE_PATH + '/districts';

/**
 * @deprecated
 * @param params
 */
export const getAllDistricts = async (params = {}) => {
  try {
    let response: any = await apiGet(API_DISTRICTS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 * @param districtId
 */
export const getDistrict = async (districtId: number) => {
  try {
    let response: any = await apiGet(API_DISTRICTS + '/' + districtId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createDistrict = async (data: District) => {
  try {
    let response: any = await apiPost(API_DISTRICTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateDistrict = async (districtId: number, data: District) => {
  try {
    let response: any = await apiPut(API_DISTRICTS + '/' + districtId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteDistrict = async (districtId: number) => {
  try {
    let response: any = await apiDelete(API_DISTRICTS + '/' + districtId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
