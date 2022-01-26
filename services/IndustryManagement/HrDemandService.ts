import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {API_JOB_REQUIREMENTS} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';

// export const getHumanResourceDemand = async ()

export const createHumanResourceDemand = async (data: any) => {
  try {
    let response: any = await apiPost(API_JOB_REQUIREMENTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateHumanResourceDemand = async (
  requirementId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_JOB_REQUIREMENTS + '/' + requirementId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteHRDemand = async (HRDemandId: number) => {
  try {
    let response: any = await apiDelete(
      API_JOB_REQUIREMENTS + '/' + HRDemandId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
