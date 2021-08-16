import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';
import {INSTITUTE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_PROGRAMMES = INSTITUTE_SERVICE_PATH + '/programmes';

export const getAllProgrammes = async () => {
  try {
    let response: any = await apiGet(API_PROGRAMMES);
    return response.data.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getProgramme = async (programmeId: number) => {
  try {
    let response: any = await apiGet(API_PROGRAMMES + '/' + programmeId);
    return response.data.data;
  } catch (catchBlockHandler) {}
};

export const createProgramme = async (data: Programme) => {
  try {
    let response: any = await apiPost(API_PROGRAMMES, data);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateProgramme = async (programmeId: number, data: Programme) => {
  try {
    let response: any = await apiPut(API_PROGRAMMES + '/' + programmeId, data);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteProgramme = async (programmeId: number) => {
  try {
    let response: any = await apiDelete(API_PROGRAMMES + '/' + programmeId);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};
