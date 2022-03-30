import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_APPROVE_HR_DEMAND_BY_INDUSTRY_ASSOCIATION,
  API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT,
  API_REJECT_HR_DEMAND_BY_INDUSTRY_ASSOCIATION,
  API_REJECT_HR_DEMAND_YOUTH,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

/** delete a job requirement */
export const deleteJobRequirement = async (requirementId: number) => {
  try {
    let response: any = await apiDelete(
      API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT + '/' + requirementId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** update a job requirement */
export const updateJobRequirement = async (
  requirementId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT + '/' + requirementId,
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
    let response: any = await apiPost(
      API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** request to approve youth list*/

export const approveYouths = async (
  hrDemandId: number,
  youth_ids: number[] = [],
) => {
  try {
    let response: any = await apiPut(
      `${API_APPROVE_HR_DEMAND_BY_INDUSTRY_ASSOCIATION}/${hrDemandId}`,
      {hr_demand_youth_ids: youth_ids},
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** reject an institute which is requested for HR's*/

export const rejectInstituteJobRequirement = async (
  hrDemandInstituteId: number,
) => {
  try {
    let response: any = await apiPut(
      `${API_REJECT_HR_DEMAND_BY_INDUSTRY_ASSOCIATION}/${hrDemandInstituteId}`,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const rejectHRDemandYouth = async (hrDemandYouthId: number) => {
  try {
    let response: any = await apiPut(
      `${API_REJECT_HR_DEMAND_YOUTH}/${hrDemandYouthId}`,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
