import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_CANDIDATE_SCHEDULE,
  API_CANDIDATE_STEP_SCHEDULE,
  API_CANDIDATE_UPDATE,
  API_INDUSTRY_ASSOCIATION_PROFILE_UPDATE,
  API_INDUSTRY_ASSOCIATIONS,
  API_RECRUITMENT_STEPS,
  API_SHOW_IN_LANDING_PAGE_STATUS_CHANGE,
} from '../../@softbd/common/apiRoutes';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {IRecruitmentStep} from '../../shared/Interface/interview.interface';

export const getAllIndustryAssociations = async (params = {}) => {
  try {
    let response: any = await apiGet(API_INDUSTRY_ASSOCIATIONS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateIndustryAssocProfile = async (data: any) => {
  try {
    let response: any = await apiPut(
      API_INDUSTRY_ASSOCIATION_PROFILE_UPDATE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRecruitmentStep = async (data: IRecruitmentStep) => {
  try {
    let response: any = await apiPost(API_RECRUITMENT_STEPS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRecruitmentStep = async (
  recruitmentId: number,
  data: IRecruitmentStep,
) => {
  try {
    let response: any = await apiPut(
      API_RECRUITMENT_STEPS + '/' + recruitmentId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteRecruitmentStep = async (recruitmentStepId: number) => {
  try {
    let response: any = await apiDelete(
      API_RECRUITMENT_STEPS + '/' + recruitmentStepId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const rejectCandidateUpdate = async (applicationId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE + applicationId + '/reject',
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const restoreCandidateUpdate = async (applicationId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE + applicationId + '/restore',
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const removeCandidateUpdate = async (applicationId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE + applicationId + '/remove',
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

//Todo: this is duplicate, remove if not needed
// export const hireInviteCandidateUpdate = async (
//   applicationId: number,
//   params: any,
// ) => {
//   try {
//     let response: any = await apiPut(
//       API_CANDIDATE_UPDATE + applicationId + '/hire-invite',
//       params,
//     );
//     return response.data;
//   } catch (error) {
//     catchBlockHandler(error);
//   }
// };

export const shortlistCandidateUpdate = async (applicationId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE + applicationId + '/shortlist',
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const hiredCandidateUpdate = async (applicationId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE + applicationId + '/hired',
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createCandidateStepSchedule = async (data: any) => {
  try {
    let response: any = await apiPost(API_CANDIDATE_STEP_SCHEDULE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCandidateStepSchedule = async (
  scheduleId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_STEP_SCHEDULE + '/' + scheduleId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCandidateStepSchedule = async (scheduleId: number) => {
  try {
    let response: any = await apiDelete(
      API_CANDIDATE_STEP_SCHEDULE + '/' + scheduleId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const candidateStepScheduleAssign = async (
  scheduleId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_SCHEDULE + '/' + scheduleId + '/assign',
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const candidateStepScheduleUnassign = async (
  scheduleId: number,
  data: any,
) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_SCHEDULE + '/' + scheduleId + '/unassign',
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const candidateStepScheduleHireInvite = async (
  applicationId: number,
  params: any,
) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE + applicationId + '/hire-invite',
      params,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const candidateStepMarkAsInterviewed = async (
  applicationId: number,
  params: any,
) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE + applicationId + '/interviewed',
      params,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const showInLandingPageStatusChange = async (data: any) => {
  try {
    let response: any = await apiPost(
      API_SHOW_IN_LANDING_PAGE_STATUS_CHANGE,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
