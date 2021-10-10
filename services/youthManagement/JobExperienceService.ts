import {apiDelete, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_YOUTH_JOB_EXPERIENCES} from '../../@softbd/common/apiRoutes';

interface JobExperience {
  id: number;
  youth_id: number;
  company_name: string;
  company_name_en: string;
  employment_type_id: number;
  position: string;
  position_en: string;
  start_date: string;
  end_date: string;
  location: string;
  location_en: string;
  description: string;
  description_en: string;
  is_currently_work: string;
  row_status: string;
}
export const createJobExperience = async (data: JobExperience) => {
  try {
    let response: any = await apiPost(API_YOUTH_JOB_EXPERIENCES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateJobExperience = async (
  JobExperienceId: number,
  data: JobExperience,
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
