import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_EXAMS,
  API_SUBMIT_EXAM_PAPER,
  API_YOUTH_EXAM_MARK_UPDATE,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

//Todo: data interface should add after clear requirement.
export const createExam = async (data: any) => {
  try {
    let response: any = await apiPost(API_EXAMS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateExam = async (examId: number, data: any) => {
  try {
    let response: any = await apiPut(API_EXAMS + '/' + examId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteExam = async (examId: number) => {
  try {
    let response: any = await apiDelete(API_EXAMS + '/' + examId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const submitExamPaper = async (data: any) => {
  try {
    let response: any = await apiPost(API_SUBMIT_EXAM_PAPER, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const youthExamMarkUpdate = async (data: any) => {
  try {
    let response: any = await apiPut(API_YOUTH_EXAM_MARK_UPDATE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
