import {apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_CANDIDATE_UPDATE_HIRE_INVITE,
  API_CANDIDATE_UPDATE_HIRED,
  API_CANDIDATE_UPDATE_REJECT,
  API_CANDIDATE_UPDATE_REMOVE,
  API_CANDIDATE_UPDATE_RESTORE,
  API_CANDIDATE_UPDATE_SHORT_LIST,
  API_INDUSTRY_ASSOCIATION_PROFILE_UPDATE,
  API_INDUSTRY_ASSOCIATIONS,
  API_RECRUITMENT_STEPS,
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

export const rejectCandidateUpdate = async (candidateId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE_REJECT + '/' + candidateId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const restoreCandidateUpdate = async (candidateId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE_RESTORE + '/' + candidateId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const removeCandidateUpdate = async (candidateId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE_REMOVE + '/' + candidateId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const hireInviteCandidateUpdate = async (
  candidateId: number,
  params: any,
) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE_HIRE_INVITE + '/' + candidateId,
      params,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const shortlistCandidateUpdate = async (candidateId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE_SHORT_LIST + '/' + candidateId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
export const hiredCandidateUpdate = async (candidateId: number) => {
  try {
    let response: any = await apiPut(
      API_CANDIDATE_UPDATE_HIRED + '/' + candidateId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
