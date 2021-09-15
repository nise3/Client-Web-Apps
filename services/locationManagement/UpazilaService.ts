import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {CORE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

const API_UPAZILAS = CORE_SERVICE_PATH + '/upazilas';

export const getAllUpazilas = async (params = {}) => {
  try {
    let response: any = await apiGet(API_UPAZILAS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getUpazila = async (upazilaId: number) => {
  try {
    let response: any = await apiGet(API_UPAZILAS + '/' + upazilaId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createUpazila = async (data: Upazila) => {
  try {
    let response: any = await apiPost(API_UPAZILAS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateUpazila = async (upazilaId: number, data: Upazila) => {
  try {
    let response: any = await apiPut(API_UPAZILAS + '/' + upazilaId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteUpazila = async (upazilaId: number) => {
  try {
    let response: any = await apiDelete(API_UPAZILAS + '/' + upazilaId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
