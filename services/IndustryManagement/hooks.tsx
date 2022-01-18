import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_GET_JOB_ADDITIONAL_INFORMATION,
  API_GET_JOB_COMPANY_INFO_VISIBILITY,
  API_GET_JOB_PRIMARY_INFORMATION,
  API_INDUSTRY_ASSOCIATIONS,
  API_HUMAN_RESOURCE_DEMAND,
  API_INDUSTRY_ASSOCIATION_MEMBERS,
  API_INDUSTRY_PUBLIC_PUBLICATIONS,
  API_JOB_REQUIREMENT,
  API_PUBLIC_INDUSTRY_ASSOCIATION_CONTACT_INFO,
  API_PUBLIC_INDUSTRY_ASSOCIATION_MEMBER_LIST,
} from '../../@softbd/common/apiRoutes';

export function useFetchPublications(params: any) {
  return useAxiosSWR([API_INDUSTRY_PUBLIC_PUBLICATIONS, params]);
}

export function useFetchPublication(publicationId: number | null) {
  return useAxiosSWR(
    publicationId
      ? API_INDUSTRY_PUBLIC_PUBLICATIONS + '/' + publicationId
      : null,
  );
}

export function useFetchContactInfo(params: any) {
  return useAxiosSWR([API_PUBLIC_INDUSTRY_ASSOCIATION_CONTACT_INFO, params]);
}

export function useFetchIndustryAssociation(industryAssocId: number | null) {
  return useAxiosSWR(
    industryAssocId ? API_INDUSTRY_ASSOCIATIONS + '/' + industryAssocId : null,
  );
}

/**Application list**/
export function useFetchApplicationList(applicationId: number | null) {
  return useAxiosSWR(
    applicationId
      ? API_INDUSTRY_ASSOCIATION_MEMBERS + '/' + applicationId
      : null,
  );
}

export function useFetchJobRequirement(jobRequirementId: number | null) {
  return useAxiosSWR(
    jobRequirementId ? API_JOB_REQUIREMENT + '/' + jobRequirementId : null,
  );
}

export function useFetchHumanResourceDemand(
  humanResourceDemandId: number | null,
) {
  return useAxiosSWR(
    humanResourceDemandId
      ? API_HUMAN_RESOURCE_DEMAND + '/' + humanResourceDemandId
      : null,
  );
}

export function useFetchHumanResourceDemands(params: any) {
  return useAxiosSWR([API_JOB_REQUIREMENT, params]);
}

export function useFetchJobPrimaryInformation(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_PRIMARY_INFORMATION + jobId : null);
}

export function useFetchJobAdditionalInformation(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_ADDITIONAL_INFORMATION + jobId : null);
}

export function useFetchJobCompanyInfoVisibility(jobId: string | null) {
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
  return useAxiosSWR([API_PUBLIC_INDUSTRY_ASSOCIATION_MEMBER_LIST, params]);
}

export function useFetchIndustryMember(memberId: number | null) {
  return useAxiosSWR(
    memberId
      ? API_PUBLIC_INDUSTRY_ASSOCIATION_MEMBER_LIST + '/' + memberId
      : null,
  );
}

/**
 * Human resource details
 */
export function useFetchHrDemandDetails(id: number | null) {
  return useAxiosSWR(id ? API_HUMAN_RESOURCE_DEMAND + '/' + id : null);
}

export function useFetchIndustryAssociationMembers(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATION_MEMBERS, params]);
}
