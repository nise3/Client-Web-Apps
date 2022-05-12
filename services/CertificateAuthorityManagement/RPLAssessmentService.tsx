import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_RPL_ASSESSMENT_QUESTIONS,
  API_RPL_ASSESSMENTS,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IAssessment} from '../../shared/Interface/common.interface';

export const deleteRPLAssessment = async (assessmentId: number) => {
  try {
    let response: any = await apiDelete(
      API_RPL_ASSESSMENTS + '/' + assessmentId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRPLAssessment = async (
  assessmentId: number,
  data: IAssessment,
) => {
  try {
    let response: any = await apiPut(
      API_RPL_ASSESSMENTS + '/' + assessmentId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRPLAssessment = async (data: IAssessment) => {
  try {
    let response: any = await apiPost(API_RPL_ASSESSMENTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const addRPLQuestionsToAssessment = async (data: any) => {
  try {
    let response: any = await apiPost(API_RPL_ASSESSMENT_QUESTIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
