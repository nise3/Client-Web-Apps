import {
  useAxiosSWR,
  useDataLocalizationAxiosSWR,
} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_GET_JOB_CANDIDATES_APPLIED_LIST,
  API_INDUSTRY_ASSOCIATION_CONTACT_INFO,
  API_INDUSTRY_ASSOCIATION_DASHBOARD_STATICS,
  API_INDUSTRY_ASSOCIATION_PROFILE,
  API_INDUSTRY_ASSOCIATION_SUB_TRADES,
  API_INDUSTRY_ASSOCIATION_TRADES,
  API_INDUSTRY_ASSOCIATIONS,
  API_PUBLIC_JOB_DETAILS,
  API_PUBLIC_NASCIB_MEMBER_STATIC_DATA,
  API_PUBLIC_SMEF_MEMBER_STATIC_DATA,
  API_RECRUITMENT_STEP_LISTS,
  API_RECRUITMENT_STEPS,
} from '../../@softbd/common/apiRoutes';

export function useFetchIndustryAssociations(params: any) {
  return useAxiosSWR(params ? [API_INDUSTRY_ASSOCIATIONS, params] : null);
}

export function useFetchLocalizedIndustryAssociations(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_INDUSTRY_ASSOCIATIONS, params] : null,
  );
}

export const useFetchContactInfo = (contactInfoId: number | null) => {
  return useAxiosSWR(
    contactInfoId
      ? API_INDUSTRY_ASSOCIATION_CONTACT_INFO + '/' + contactInfoId
      : null,
  );
};

export function useFetchIndustryAssocProfile() {
  return useAxiosSWR(API_INDUSTRY_ASSOCIATION_PROFILE);
}

export function useFetchIndustryAssociationTrades(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATION_TRADES, params]);
}

export function useFetchLocalizedIndustryAssociationTrades(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_INDUSTRY_ASSOCIATION_TRADES, params] : null,
  );
}

export function useFetchIndustryAssociationSubTrades(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATION_SUB_TRADES, params]);
}

export function useFetchLocalizedIndustryAssociationSubTrades(params: any) {
  return useDataLocalizationAxiosSWR([
    API_INDUSTRY_ASSOCIATION_SUB_TRADES,
    params,
  ]);
}

export function useFetchPublicJob(jobId: any, params?: any) {
  return useDataLocalizationAxiosSWR(
    jobId
      ? params
        ? [API_PUBLIC_JOB_DETAILS + '/' + jobId, params]
        : API_PUBLIC_JOB_DETAILS + '/' + jobId
      : null,
  );
}

export function useFetchIndustryAssociationDashboardStatics() {
  return useAxiosSWR(API_INDUSTRY_ASSOCIATION_DASHBOARD_STATICS);
}

export function useFetchJobCandidatesAppliedList(jobId: any) {
  return useAxiosSWR(
    jobId ? API_GET_JOB_CANDIDATES_APPLIED_LIST + '/' + jobId : null,
  );
}

export function useFetchJobRecruitmentStep(stepId: any) {
  return useAxiosSWR(stepId ? API_RECRUITMENT_STEPS + '/' + stepId : null);
}

export function useFetchJobRecruitmentSteps(jobId: string) {
  return useAxiosSWR(jobId ? API_RECRUITMENT_STEP_LISTS + jobId : null);
}

export function useFetchNascibMemberStaticData() {
  return useAxiosSWR(API_PUBLIC_NASCIB_MEMBER_STATIC_DATA);
}

export function useFetchLocalizedNascibMemberStaticData() {
  return useDataLocalizationAxiosSWR(API_PUBLIC_NASCIB_MEMBER_STATIC_DATA);
}

export function useFetchSMEFMemberStaticData() {
  return useAxiosSWR(API_PUBLIC_SMEF_MEMBER_STATIC_DATA);
}

export function useFetchLocalizedSMEFMemberStaticData() {
  return useDataLocalizationAxiosSWR(API_PUBLIC_SMEF_MEMBER_STATIC_DATA);
}
