import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import { API_RTO_BATCH } from "../../@softbd/common/apiRoutes";
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const deleteRTOBatch = async (RTOBatchId: number) => {
  try {
    let response: any = await apiDelete(API_RTO_BATCH + '/' + RTOBatchId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRTOBatch = async (
  rtoBatchId: number|null,
  data: any,
) => {
  try {
    let response: any = await apiPut(API_RTO_BATCH + '/' + rtoBatchId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRTOBatch = async (data: any) => {
  try {
    let response: any = await apiPost(API_RTO_BATCH, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};