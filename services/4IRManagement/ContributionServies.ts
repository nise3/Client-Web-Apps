import {apiPost} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_PROJECT_CONTRIBUTIONS} from '../../@softbd/common/apiRoutes';

export const createOrUpdateContribution = async (id: number, data: any) => {
  try {
    let response: any = await apiPost(API_4IR_PROJECT_CONTRIBUTIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
