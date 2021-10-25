import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_PROGRAMMES} from '../../@softbd/common/apiRoutes';

/**
 * @deprecated
 */
export const getAllProgrammes = async (params = {}) => {
  try {
    let response: any = await apiGet(API_PROGRAMMES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getProgramme = async (programmeId: number) => {
  try {
    let response: any = await apiGet(API_PROGRAMMES + '/' + programmeId);
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createProgramme = async (data: Programme) => {
  try {
    let response: any = await apiPost(API_PROGRAMMES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateProgramme = async (programmeId: number, data: Programme) => {
  try {
    let response: any = await apiPut(API_PROGRAMMES + '/' + programmeId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteProgramme = async (programmeId: number) => {
  try {
    let response: any = await apiDelete(API_PROGRAMMES + '/' + programmeId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
