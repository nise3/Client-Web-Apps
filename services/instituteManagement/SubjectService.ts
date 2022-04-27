import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_EXAM_SUBJECTS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IExamSubject} from '../../shared/Interface/institute.interface';

export const createSubject = async (data: IExamSubject) => {
  try {
    let response: any = await apiPost<IExamSubject>(API_EXAM_SUBJECTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateSubject = async (SubjectId: number, data: IExamSubject) => {
  try {
    let response: any = await apiPut<IExamSubject>(
      API_EXAM_SUBJECTS + '/' + SubjectId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteSubject = async (SubjectId: number) => {
  try {
    let response: any = await apiDelete(API_EXAM_SUBJECTS + '/' + SubjectId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
