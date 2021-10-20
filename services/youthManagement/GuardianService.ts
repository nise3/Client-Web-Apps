import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_YOUTH_GUARDIANS} from '../../@softbd/common/apiRoutes';
import {Guardian} from './typing';

export const createGuardian = async (data: Guardian) => {
  try {
    let response: any = await apiPost(API_YOUTH_GUARDIANS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateGuardian = async (guardianId: number, data: Guardian) => {
  console.log('update call: ', guardianId, data);
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
