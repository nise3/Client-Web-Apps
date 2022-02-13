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
} from '../../@softbd/common/apiRoutes';

export function useFetchIndustryAssociations(params: any) {
  return useAxiosSWR(params ? [API_INDUSTRY_ASSOCIATIONS, params] : null);
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

export function useFetchIndustryAssociationSubTrades(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATION_SUB_TRADES, params]);
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
