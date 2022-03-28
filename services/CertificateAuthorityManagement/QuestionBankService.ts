import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_RPL_QUESTION_BANK} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const deleteQuestion = async (RTOQuestionId: number) => {
  try {
    let response: any = await apiDelete(
      API_RPL_QUESTION_BANK + '/' + RTOQuestionId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateQuestion = async (
  rtoQuestionId: number | null,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_RPL_QUESTION_BANK + '/' + rtoQuestionId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createQuestion = async (data: any) => {
  try {
    let response: any = await apiPost(API_RPL_QUESTION_BANK, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
