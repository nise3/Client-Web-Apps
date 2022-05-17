import {apiGet, apiPost} from '../../@softbd/common/api';
import {API_COURSE_RESULT_CONFIG} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const getResultConfig = async (resultConfigId: number) => {
  try {
    let response: any = await apiGet(
      API_COURSE_RESULT_CONFIG + '/' + resultConfigId,
    );
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createResultConfig = async (data: any) => {
  try {
    let response: any = await apiPost(API_COURSE_RESULT_CONFIG, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateResultConfig = async (resultConfigId: number, data: any) => {
  try {
    let response: any = await apiPost(
      API_COURSE_RESULT_CONFIG + '/' + resultConfigId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
