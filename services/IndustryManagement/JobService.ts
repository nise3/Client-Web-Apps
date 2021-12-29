import {apiDelete, apiGet, apiPost} from '../../@softbd/common/api';
import {
  API_JOB_ID,
  API_JOB_LISTS,
  API_JOB_STORE_ADDITIONAL_INFORMATION,
  API_JOB_STORE_PRIMARY_INFORMATION,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const getJobId = async () => {
  try {
    let response: any = await apiGet(API_JOB_ID);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const savePrimaryJobInformation = async (data: any) => {
  try {
    let response: any = await apiPost(API_JOB_STORE_PRIMARY_INFORMATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const saveAdditionalJobInformation = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_JOB_STORE_ADDITIONAL_INFORMATION,
      data,
    );
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
