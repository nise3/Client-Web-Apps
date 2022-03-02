import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_SUBJECTS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {ISubject} from '../../shared/Interface/institute.interface';

export const deleteSubject = async (subjectId: number) => {
  try {
    let response: any = await apiDelete(API_SUBJECTS + '/' + subjectId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createSubject = async (data: ISubject) => {
  try {
    let response: any = await apiPost(API_SUBJECTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateSubject = async (subjectId: number, data: ISubject) => {
  try {
    let response: any = await apiPut(API_SUBJECTS + '/' + subjectId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
