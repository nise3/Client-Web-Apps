import {apiPut} from '../../@softbd/common/api';
import {
  API_HUMAN_RESOURCE_DEMAND_APPROVED_BY_INSTITUTE,
  API_HUMAN_RESOURCE_DEMAND_REJECTED_BY_INSTITUTE,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const updateHrDemand = async (hrDemandId: number | null, data: any) => {
  try {
    let response: any = await apiPut(
      API_HUMAN_RESOURCE_DEMAND_APPROVED_BY_INSTITUTE + '/' + hrDemandId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const rejectHrdemand = async (hrDemandId: number | null) => {
  try {
    let response: any = await apiPut(
      API_HUMAN_RESOURCE_DEMAND_REJECTED_BY_INSTITUTE + '/' + hrDemandId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
