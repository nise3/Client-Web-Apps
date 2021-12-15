import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_JOB_LISTS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
export const createJob = async (data: any) => {
  try {
    let response: any = await apiPost(API_JOB_LISTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateJob = async (branchId: number, data: any) => {
  try {
    let response: any = await apiPut(API_JOB_LISTS + '/' + branchId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteJob = async (jobId: number) => {
  try {
    let response: any = await apiDelete(API_JOB_LISTS + '/' + jobId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
