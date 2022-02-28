import {apiPost} from '../../@softbd/common/api';
import {API_YOUTH_JOB_RESPONSE} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createJobResponse = async (data: any) => {
  try {
    let response: any = await apiPost(API_YOUTH_JOB_RESPONSE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
