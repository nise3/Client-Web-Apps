import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_RPL_SUBJECTS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {ISubject} from '../../shared/Interface/institute.interface';

export const deleteRPLSubject = async (subjectId: number) => {
  try {
    let response: any = await apiDelete(API_RPL_SUBJECTS + '/' + subjectId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRPLSubject = async (data: ISubject) => {
  try {
    let response: any = await apiPost(API_RPL_SUBJECTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRPLSubject = async (subjectId: number, data: ISubject) => {
  try {
    let response: any = await apiPut(API_RPL_SUBJECTS + '/' + subjectId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
