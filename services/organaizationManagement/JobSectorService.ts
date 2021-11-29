import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_JOB_SECTORS} from '../../@softbd/common/apiRoutes';
import { IJobSector } from '../../shared/Interface/organization.interface';

/**
 * @deprecated
 */
export const getAllJobSectors = async (params = {}) => {
  try {
    let response: any = await apiGet(API_JOB_SECTORS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getJobSector = async (jobSectorId: number) => {
  try {
    let response: any = await apiGet(API_JOB_SECTORS + '/' + jobSectorId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createJobSector = async (data: IJobSector) => {
  try {
    let response: any = await apiPost(API_JOB_SECTORS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateJobSector = async (jobSectorId: number, data: IJobSector) => {
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
