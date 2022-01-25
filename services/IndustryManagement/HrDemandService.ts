import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
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

export const deleteHRDemand = async (HRDemandId: number) => {
  try {
    let response: any = await apiDelete(
      API_HUMAN_RESOURCE_DEMAND + '/' + HRDemandId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
