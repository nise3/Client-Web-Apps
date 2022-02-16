import {apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {
  API_CANDIDATE_UPDATE,
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
export const hireInviteCandidateUpdate = async (
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
