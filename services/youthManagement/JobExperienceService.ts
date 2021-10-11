import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_YOUTH_JOB_EXPERIENCES} from '../../@softbd/common/apiRoutes';
import {YouthJobExperience} from './typing';

export const createJobExperience = async (data: YouthJobExperience) => {
  try {
    let response: any = await apiPost(API_YOUTH_JOB_EXPERIENCES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateJobExperience = async (
  JobExperienceId: number,
  data: YouthJobExperience,
) => {
  try {
    let response: any = await apiPut(
      API_YOUTH_JOB_EXPERIENCES + '/' + JobExperienceId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteJobExperience = async (jobExperienceId: number) => {
  try {
    let response: any = await apiDelete(
      API_YOUTH_JOB_EXPERIENCES + '/' + jobExperienceId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
