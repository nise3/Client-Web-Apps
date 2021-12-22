import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_APPLICATIONS_LISTS,
  API_HUMAN_RESOURCE_DEMAND_LIST,
  API_INDUSTRY_MEMBERS,
  API_INDUSTRY_PUBLICATIONS,
  API_JOB_LISTS,
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

/**Job lists**/
export function useFetchJob(jobId: number | null) {
  return useAxiosSWR(jobId ? API_JOB_LISTS + '/' + jobId : null);
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
