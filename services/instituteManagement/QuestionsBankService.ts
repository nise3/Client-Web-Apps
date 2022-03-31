import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_EXAM_QUESTION_BANK} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const deleteQuestionsBank = async (questionsBankId: number) => {
  try {
    let response: any = await apiDelete(
      API_EXAM_QUESTION_BANK + '/' + questionsBankId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateQuestionsBank = async (
  questionsBankId: number | null,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_EXAM_QUESTION_BANK + '/' + questionsBankId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createQuestionsBank = async (data: any) => {
  try {
    let response: any = await apiPost(API_EXAM_QUESTION_BANK, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
