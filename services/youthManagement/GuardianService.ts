import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_YOUTH_GUARDIANS, API_YOUTH_GUARDIANS_BY_YOUTH} from '../../@softbd/common/apiRoutes';
import {Guardian} from './typing';

export const createGuardian = async (data: Guardian) => {
  try {
    let response: any = await apiPost(API_YOUTH_GUARDIANS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getGuardianByYouthId = async (youthId: number) => {
  try {
    let response: any = await apiGet(API_YOUTH_GUARDIANS_BY_YOUTH + '/' + youthId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateGuardian = async (guardianId: number, data: Guardian) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_GUARDIANS + '/' + guardianId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteGuardian = async (guardianId: number) => {
  try {
    let response: any = await apiDelete(API_YOUTH_GUARDIANS + '/' + guardianId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
