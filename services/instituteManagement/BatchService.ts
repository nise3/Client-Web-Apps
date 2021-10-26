import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_BATCHES} from '../../@softbd/common/apiRoutes';

/**
 * @deprecated
 */
export const getAllBatches = async (params = {}) => {
  try {
    let response: any = await apiGet(API_BATCHES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getBatch = async (batchId: number) => {
  try {
    let response: any = await apiGet(API_BATCHES + '/' + batchId);
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createBatch = async (data: Batch) => {
  try {
    let response: any = await apiPost(API_BATCHES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateBatch = async (batchId: number, data: Batch) => {
  try {
    let response: any = await apiPut(API_BATCHES + '/' + batchId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteBatch = async (batchId: number) => {
  try {
    let response: any = await apiDelete(API_BATCHES + '/' + batchId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const assignTrainersToBatch = async (batchId: number, data: any) => {
  let trainersId = {trainerIds: data};
  try {
    let response: any = await apiPost(
      API_BATCHES + '/' + batchId + '/assign-trainer-to-batch',
      trainersId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
