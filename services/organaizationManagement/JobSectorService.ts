import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';
import {ORGANIZATION_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_JOB_SECTORS = ORGANIZATION_SERVICE_PATH + '/job-sectors';

export const getAllJobSectors = async (params = {}) => {
  try {
    let response: any = await apiGet(API_JOB_SECTORS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getJobSector = async (jobSectorId: number) => {
  try {
    let response: any = await apiGet(API_JOB_SECTORS + '/' + jobSectorId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createJobSector = async (data: JobSector) => {
  try {
    let response: any = await apiPost(API_JOB_SECTORS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateJobSector = async (jobSectorId: number, data: JobSector) => {
  try {
    let response: any = await apiPut(API_JOB_SECTORS + '/' + jobSectorId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteJobSector = async (jobSectorId: number) => {
  try {
    let response: any = await apiDelete(API_JOB_SECTORS + '/' + jobSectorId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
