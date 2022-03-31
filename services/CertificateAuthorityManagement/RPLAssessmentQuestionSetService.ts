import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_RPL_ASSESSMENT_QUESTION_SETS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IQuestionSet} from '../../shared/Interface/institute.interface';

export const deleteRPLAssessmentQuestionSet = async (questionSetId: number) => {
  try {
    let response: any = await apiDelete(
      API_RPL_ASSESSMENT_QUESTION_SETS + '/' + questionSetId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRPLAssessmentQuestionSet = async (data: IQuestionSet) => {
  try {
    let response: any = await apiPost(API_RPL_ASSESSMENT_QUESTION_SETS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRPLAssessmentQuestionSet = async (
  questionSetId: number,
  data: IQuestionSet,
) => {
  try {
    let response: any = await apiPut(
      API_RPL_ASSESSMENT_QUESTION_SETS + '/' + questionSetId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
