import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_ASSESSMENT_QUESTION_SETS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IQuestionSet} from '../../shared/Interface/institute.interface';

export const deleteAssessmentQuestionSet = async (questionSetId: number) => {
  try {
    let response: any = await apiDelete(
      API_ASSESSMENT_QUESTION_SETS + '/' + questionSetId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createAssessmentQuestionSet = async (data: IQuestionSet) => {
  try {
    let response: any = await apiPost(API_ASSESSMENT_QUESTION_SETS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateAssessmentQuestionSet = async (
  questionSetId: number,
  data: IQuestionSet,
) => {
  try {
    let response: any = await apiPut(
      API_ASSESSMENT_QUESTION_SETS + '/' + questionSetId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
