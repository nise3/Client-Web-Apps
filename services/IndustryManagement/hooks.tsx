import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_GET_BUSINESS_AREAS,
  API_GET_EDUCATION_LEVELS,
  API_GET_EDUCATIONAL_INSTITUTES,
  API_GET_EXAM_DEGREES,
  API_GET_EXPERIENCE_AREAS,
  API_GET_JOB_ADDITIONAL_INFORMATION,
  API_GET_JOB_CANDIDATE_REQUIREMENTS,
  API_GET_JOB_COMPANY_INFO_VISIBILITY,
  API_GET_JOB_CONTACT_INFORMATION,
  API_GET_JOB_LOCATIONS,
  API_GET_JOB_MATCHING_CRITERIA,
  API_GET_JOB_PREVIEW,
  API_GET_JOB_PRIMARY_INFORMATION,
  API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT,
  API_INDUSTRY_ASSOCIATION_MEMBERS,
  API_INDUSTRY_ASSOCIATIONS,
  API_INDUSTRY_PUBLIC_PUBLICATIONS,
  API_INSTITUTE_HUMAN_RESOURCE_DEMANDS,
  API_JOB_REQUIREMENTS,
  API_PUBLIC_INDUSTRY_ASSOCIATION_CONTACT_INFO,
  API_PUBLIC_INDUSTRY_ASSOCIATION_MEMBER_LIST,
  API_PUBLIC_JOBS,
  API_PUBLIC_ORGANIZATIONS,
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
    jobRequirementId
      ? API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT + '/' + jobRequirementId
      : null,
  );
}

export function useFetchHumanResourceDemand(
  humanResourceDemandId: number | null,
) {
  return useAxiosSWR(
    humanResourceDemandId
      ? API_JOB_REQUIREMENTS + '/' + humanResourceDemandId
      : null,
  );
}

export function useFetchHumanResourceDemands(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT, params]);
}

export function useFetchInstituteHumanResourceDemands(params: any) {
  return useAxiosSWR([API_INSTITUTE_HUMAN_RESOURCE_DEMANDS, params]);
}

export function useFetchPublicJobs(params: any) {
  return useAxiosSWR([API_PUBLIC_JOBS, params]);
}

export function useFetchJobPrimaryInformation(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_PRIMARY_INFORMATION + jobId : null);
}

export function useFetchJobAdditionalInformation(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_ADDITIONAL_INFORMATION + jobId : null);
}

export function useFetchJobCandidateRequirements(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_CANDIDATE_REQUIREMENTS + jobId : null);
}

export function useFetchJobCompanyInfoVisibility(jobId: string | null) {
  return useAxiosSWR(
    jobId ? API_GET_JOB_COMPANY_INFO_VISIBILITY + jobId : null,
  );
}

export function useFetchJobMatchingCriteria(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_MATCHING_CRITERIA + jobId : null);
}

export function useFetchJobContactInformation(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_CONTACT_INFORMATION + jobId : null);
}

export function useFetchJobPreview(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_PREVIEW + jobId : null);
}

export function useFetchJob(jobId: string | null) {
  return useAxiosSWR(jobId ? API_GET_JOB_PREVIEW + jobId : null);
}

export function useFetchJobLocations() {
  return useAxiosSWR(API_GET_JOB_LOCATIONS);
}

export function useFetchEducationalInstitutes() {
  return useAxiosSWR(API_GET_EDUCATIONAL_INSTITUTES);
}

export function useFetchBusinessAreas() {
  return useAxiosSWR(API_GET_BUSINESS_AREAS);
}

export function useFetchExperienceAreas() {
  return useAxiosSWR(API_GET_EXPERIENCE_AREAS);
}

export function useFetchEducationLevels() {
  return useAxiosSWR(API_GET_EDUCATION_LEVELS);
}

export function useFetchExamDegrees() {
  return useAxiosSWR(API_GET_EXAM_DEGREES);
}

export function useFetchIndustryMembers(params: any) {
  return useAxiosSWR([API_PUBLIC_INDUSTRY_ASSOCIATION_MEMBER_LIST, params]);
}

export function useFetchIndustryMember(memberId: number | null) {
  return useAxiosSWR(
    memberId ? API_PUBLIC_ORGANIZATIONS + '/' + memberId : null,
  );
}

/**
 * Human resource details
 */
export function useFetchHrDemandDetails(id: number | null) {
  return useAxiosSWR(id ? API_JOB_REQUIREMENTS + '/' + id : null);
}

export function useFetchIndustryAssociationMembers(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATION_MEMBERS, params]);
}
