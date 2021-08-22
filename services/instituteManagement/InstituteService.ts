import {INSTITUTE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';
import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';

const API_INSTITUTES = INSTITUTE_SERVICE_PATH + '/institutes';

export const getAllInstitutes = async () => {
  try {
    let response: any = await apiGet(API_INSTITUTES);
    return response.data.data;
  } catch (error) {
    console.log(error);
    catchBlockHandler(error);
  }
};

export const getInstitute = async (InstituteId: number) => {
  try {
    let response: any = await apiGet(API_INSTITUTES + '/' + InstituteId);
    return response.data.data;
  } catch (catchBlockHandler) {}
};

export const createInstitute = async (data: Institute) => {
  try {
    let response: any = await apiPost(API_INSTITUTES, data);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateInstitute = async (InstituteId: number, data: Institute) => {
  try {
    let response: any = await apiPut(API_INSTITUTES + '/' + InstituteId, data);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteInstitute = async (InstituteId: number) => {
  try {
    let response: any = await apiDelete(API_INSTITUTES + '/' + InstituteId);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};