import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_ASSESSMENT_QUESTIONS,
  API_ASSESSMENTS,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IAssessment} from '../../shared/Interface/common.interface';

export const deleteAssessment = async (assessmentId: number) => {
  try {
    let response: any = await apiDelete(API_ASSESSMENTS + '/' + assessmentId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateAssessment = async (
  assessmentId: number,
  data: IAssessment,
) => {
  try {
    let response: any = await apiPut(
      API_ASSESSMENTS + '/' + assessmentId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createAssessment = async (data: IAssessment) => {
  try {
    let response: any = await apiPost(API_ASSESSMENTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const addQuestionsToAssessment = async (data: any) => {
  try {
    let response: any = await apiPost(API_ASSESSMENT_QUESTIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
