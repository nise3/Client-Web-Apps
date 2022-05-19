import {apiPost} from '../../@softbd/common/api';
import {API_COURSE_RESULT_CONFIG} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createResultConfig = async (data: any) => {
  try {
    let response: any = await apiPost(API_COURSE_RESULT_CONFIG, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
