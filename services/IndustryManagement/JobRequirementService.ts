import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_JOB_REQUIREMENT} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

/** delete a publication */
export const deleteJobRequirement = async (requirementId: number) => {
  try {
    let response: any = await apiDelete(
      API_JOB_REQUIREMENT + '/' + requirementId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** update a publication */
export const updateJobRequirement = async (
  requirementId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_JOB_REQUIREMENT + '/' + requirementId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** Create a new JobRequirement */
export const createJobRequirement = async (data: any) => {
  try {
    let response: any = await apiPost(API_JOB_REQUIREMENT, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};