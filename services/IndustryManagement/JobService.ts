import {apiDelete, apiGet, apiPost} from '../../@softbd/common/api';
import {
  API_JOB_ID,
  API_JOB_STORE_ADDITIONAL_INFORMATION,
  API_JOB_STORE_CANDIDATE_REQUIREMENTS,
  API_JOB_STORE_COMPANY_INFO_VISIBILITY,
  API_JOB_STORE_CONTACT_INFORMATION,
  API_JOB_STORE_MATCHING_CRITERIA,
  API_JOB_STORE_PRIMARY_INFORMATION,
  API_JOBS,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

export const getJobId = async () => {
  try {
    let response: any = await apiGet(API_JOB_ID);
    return response?.data;
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

export const saveCandidateRequirements = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_JOB_STORE_CANDIDATE_REQUIREMENTS,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const saveCompanyInfoVisibility = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_JOB_STORE_COMPANY_INFO_VISIBILITY,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const saveMatchingCriteria = async (data: any) => {
  try {
    let response: any = await apiPost(API_JOB_STORE_MATCHING_CRITERIA, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const saveContactInformation = async (data: any) => {
  try {
    let response: any = await apiPost(API_JOB_STORE_CONTACT_INFORMATION, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteJob = async (jobId: number) => {
  try {
    let response: any = await apiDelete(API_JOBS + '/' + jobId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const publishJob = async (jobId: string, data: any) => {
  try {
    let response: any = await apiPost(
      API_JOBS + '/status-change' + '/' + jobId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
