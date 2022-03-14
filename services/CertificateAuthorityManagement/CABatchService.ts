import {apiPost} from '../../@softbd/common/api';
import {API_RTO_BATCH} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createAssignAssessor = async (batchId: any, data: any) => {
  try {
    let response: any = await apiPost(
      API_RTO_BATCH + '/' + batchId + '/assign-assessor',
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
