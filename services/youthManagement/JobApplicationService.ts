import {apiPost} from '../../@softbd/common/api';
import {API_YOUTH_APPLY_JOB} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createJobApplication = async (data: any) => {
  try {
    let response: any = await apiPost(API_YOUTH_APPLY_JOB, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
