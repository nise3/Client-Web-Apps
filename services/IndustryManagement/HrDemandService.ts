import {apiPost, apiPut} from '../../@softbd/common/api';
import {API_HUMAN_RESOURCE_DEMAND} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const createHumanResourceDemand = async (data: any) => {
  try {
    let response: any = await apiPost(API_HUMAN_RESOURCE_DEMAND, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateHumanResourceDemand = async (
  requirementId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_HUMAN_RESOURCE_DEMAND + '/' + requirementId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
