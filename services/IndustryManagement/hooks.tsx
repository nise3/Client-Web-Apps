import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_APPLICATIONS_LISTS,
  API_GET_JOB_ADDITIONAL_INFORMATION,
  API_GET_JOB_COMPANY_INFO_VISIBILITY,
  API_GET_JOB_PRIMARY_INFORMATION,
  API_HUMAN_RESOURCE_DEMAND_LIST,
  API_INDUSTRY_MEMBERS,
  API_INDUSTRY_PUBLICATIONS,
  API_JOB_REQUIREMENT,
} from '../../@softbd/common/apiRoutes';

export function useFetchPublications(params: any) {
  return useAxiosSWR([API_INDUSTRY_PUBLICATIONS, params]);
}

export function useFetchPublication(publicationId: number | null) {
  return useAxiosSWR(
    publicationId ? API_INDUSTRY_PUBLICATIONS + '/' + publicationId : null,
  );
}

/**Application list**/
export function useFetchApplicationList(applicationId: number | null) {
  return useAxiosSWR(
    applicationId ? API_APPLICATIONS_LISTS + '/' + applicationId : null,
  );
}

export function useFetchJobRequirement(jobRequirementId: number | null) {
  return useAxiosSWR(
    jobRequirementId ? API_JOB_REQUIREMENT + '/' + jobRequirementId : null,
  );
}

export function useFetchJobRequirements(params: any) {
  return useAxiosSWR([API_JOB_REQUIREMENT, params]);
}

export function useFetchJobPrimaryInformation(jobId: number | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_PRIMARY_INFORMATION + jobId : null);
}

export function useFetchJobAdditionalInformation(jobId: number | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_ADDITIONAL_INFORMATION + jobId : null);
}

export function useFetchJobCompanyInfoVisibility(jobId: number | null) {
  return useAxiosSWR(
    jobId ? API_GET_JOB_COMPANY_INFO_VISIBILITY + jobId : null,
  );
}

export function useFetchJob(jobId: string | null) {
  return useAxiosSWR(
    jobId ? API_GET_JOB_COMPANY_INFO_VISIBILITY + jobId : null,
  );
}

export function useFetchIndustryMembers(params: any) {
  return useAxiosSWR([API_INDUSTRY_MEMBERS, params]);
}

export function useFetchIndustryMember(memberId: number | null) {
  return useAxiosSWR(memberId ? API_INDUSTRY_MEMBERS + '/' + memberId : null);
}

/**
 * Human resource details
 */
export function useFetchHrDemandDetails(id: number | null) {
  return useAxiosSWR(id ? API_HUMAN_RESOURCE_DEMAND_LIST + '/' + id : null);
}
