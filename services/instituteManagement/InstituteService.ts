import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_INSTITUTE_PROFILE,
  API_INSTITUTES,
} from '../../@softbd/common/apiRoutes';
import {IInstitute} from '../../shared/Interface/institute.interface';

export const getAllInstitutes = async (params = {}) => {
  try {
    let response: any = await apiGet(API_INSTITUTES, {params});
    return response.data;
  } catch (error) {
    console.log(error);
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getInstitute = async (InstituteId: number) => {
  try {
    let response: any = await apiGet(API_INSTITUTES + '/' + InstituteId);
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createInstitute = async (data: IInstitute) => {
  try {
    let response: any = await apiPost(API_INSTITUTES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateInstitute = async (
  InstituteId: number,
  data: IInstitute,
) => {
  try {
    let response: any = await apiPut(API_INSTITUTES + '/' + InstituteId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateInstituteProfile = async (data: any) => {
  try {
    let response: any = await apiPut(API_INSTITUTE_PROFILE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteInstitute = async (InstituteId: number) => {
  try {
    let response: any = await apiDelete(API_INSTITUTES + '/' + InstituteId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
