import {
  useAxiosSWR,
  useDataLocalizationAxiosSWR,
} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_CANDIDATE_STEP_SCHEDULE,
  API_CANDIDATE_UPDATE,
  API_GET_BUSINESS_AREAS,
  API_GET_EDUCATION_LEVELS,
  API_GET_EDUCATIONAL_INSTITUTES,
  API_GET_EXAM_DEGREES,
  API_GET_EXPERIENCE_AREAS,
  API_GET_JOB_ADDITIONAL_INFORMATION,
  API_GET_JOB_CANDIDATE_REQUIREMENTS,
  API_GET_JOB_CANDIDATES,
  API_GET_JOB_COMPANY_INFO_VISIBILITY,
  API_GET_JOB_CONTACT_INFORMATION,
  API_GET_JOB_LOCATIONS,
  API_GET_JOB_MATCHING_CRITERIA,
  API_GET_JOB_PREVIEW,
  API_GET_JOB_PRIMARY_INFORMATION,
  API_HR_DEMAND_INSTITUTE_PROVIDED_YOUTH_LIST,
  API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT,
  API_INDUSTRY_ASSOCIATION_MEMBERS,
  API_INDUSTRY_ASSOCIATIONS,
  API_INSTITUTE_HUMAN_RESOURCE_DEMANDS,
  API_JOB_REQUIREMENTS,
  API_JOBS_CANDIDATES,
  API_PUBLIC_INDUSTRY_ASSOC_DETAILS,
  API_PUBLIC_INDUSTRY_ASSOCIATION_CONTACT_INFO,
  API_PUBLIC_INDUSTRY_ASSOCIATION_MEMBER_LIST,
  API_PUBLIC_INDUSTRY_PUBLICATIONS,
  API_PUBLIC_JOBS,
  API_PUBLIC_ORGANIZATIONS,
  API_RECRUITMENT_STEPS,
} from '../../@softbd/common/apiRoutes';
import {useAuthUser} from '../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../redux/types/models/CommonAuthUser';
import {useEffect, useState} from 'react';

export function useFetchPublications(params: any) {
  return useDataLocalizationAxiosSWR([
    API_PUBLIC_INDUSTRY_PUBLICATIONS,
    params,
  ]);
}

export function useFetchJobCandidates(jobId: any) {
  return useDataLocalizationAxiosSWR([API_GET_JOB_CANDIDATES + `/${jobId}`]);
}

export function useFetchPublicPublication(publicationId: number | null) {
  return useDataLocalizationAxiosSWR(
    publicationId
      ? API_PUBLIC_INDUSTRY_PUBLICATIONS + '/' + publicationId
      : null,
  );
}

export function useFetchPublicIndustryAssocDetails() {
  return useDataLocalizationAxiosSWR(API_PUBLIC_INDUSTRY_ASSOC_DETAILS);
}

export function useFetchContactInfo(params: any) {
  return useDataLocalizationAxiosSWR([
    API_PUBLIC_INDUSTRY_ASSOCIATION_CONTACT_INFO,
    params,
  ]);
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

export function useFetchInstituteProvidedYouthList(
  hrDemandInstituteId: number | null,
  params: any,
) {
  return useAxiosSWR(
    hrDemandInstituteId
      ? [
          API_HR_DEMAND_INSTITUTE_PROVIDED_YOUTH_LIST +
            '/' +
            hrDemandInstituteId,
          params,
        ]
      : null,
  );
}

export function useFetchHumanResourceDemands(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATION_JOB_REQUIREMENT, params]);
}

export function useFetchInstituteHumanResourceDemands(params: any) {
  return useAxiosSWR(
    params ? [API_INSTITUTE_HUMAN_RESOURCE_DEMANDS, params] : null,
  );
}

export function useFetchLocalizedInstituteHumanResourceDemands(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_INSTITUTE_HUMAN_RESOURCE_DEMANDS, params] : null,
  );
}

export function useFetchPublicJobs(params: any) {
  const authUser = useAuthUser<YouthAuthUser>();
  const [parameters, setParameters] = useState<any>(params);
  useEffect(() => {
    setParameters({...params, youth_id: authUser?.youthId});
  }, [authUser, params]);

  return useDataLocalizationAxiosSWR(
    parameters ? [API_PUBLIC_JOBS, parameters] : null,
  );
}

export function useFetchJobPrimaryInformation(jobId: string | null) {
  return useDataLocalizationAxiosSWR(
    jobId ? API_GET_JOB_PRIMARY_INFORMATION + jobId : null,
  );
}

export function useFetchJobAdditionalInformation(jobId: string | null) {
  return useDataLocalizationAxiosSWR(
    jobId ? API_GET_JOB_ADDITIONAL_INFORMATION + jobId : null,
  );
}

export function useFetchJobCandidateRequirements(jobId: string | null) {
  return useDataLocalizationAxiosSWR(
    jobId ? API_GET_JOB_CANDIDATE_REQUIREMENTS + jobId : null,
  );
}

export function useFetchJobCompanyInfoVisibility(jobId: string | null) {
  return useDataLocalizationAxiosSWR(
    jobId ? API_GET_JOB_COMPANY_INFO_VISIBILITY + jobId : null,
  );
}

export function useFetchJobMatchingCriteria(jobId: string | null) {
  return useDataLocalizationAxiosSWR(
    jobId ? API_GET_JOB_MATCHING_CRITERIA + jobId : null,
  );
}

export function useFetchJobContactInformation(jobId: string | null) {
  return useDataLocalizationAxiosSWR(
    jobId ? API_GET_JOB_CONTACT_INFORMATION + jobId : null,
  );
}

export function useFetchJobPreview(jobId: string | null) {
  return useDataLocalizationAxiosSWR(
    jobId ? API_GET_JOB_PREVIEW + jobId : null,
  );
}

export function useFetchJob(jobId: string | null) {
  return useDataLocalizationAxiosSWR(
    jobId ? API_GET_JOB_PREVIEW + jobId : null,
  );
}

export function useFetchJobLocations() {
  return useDataLocalizationAxiosSWR(API_GET_JOB_LOCATIONS);
}

export function useFetchEducationalInstitutes() {
  return useDataLocalizationAxiosSWR(API_GET_EDUCATIONAL_INSTITUTES);
}

export function useFetchBusinessAreas() {
  return useDataLocalizationAxiosSWR(API_GET_BUSINESS_AREAS);
}

export function useFetchExperienceAreas() {
  return useDataLocalizationAxiosSWR(API_GET_EXPERIENCE_AREAS);
}

export function useFetchEducationLevels() {
  return useDataLocalizationAxiosSWR(API_GET_EDUCATION_LEVELS);
}

export function useFetchExamDegrees() {
  return useDataLocalizationAxiosSWR(API_GET_EXAM_DEGREES);
}

export function useFetchPublicIndustryMembers(params: any) {
  return useDataLocalizationAxiosSWR([
    API_PUBLIC_INDUSTRY_ASSOCIATION_MEMBER_LIST,
    params,
  ]);
}

export function useFetchIndustryMembers(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_INDUSTRY_ASSOCIATION_MEMBERS, params] : null,
  );
}

export function useFetchIndustryMember(memberId: number | null) {
  return useDataLocalizationAxiosSWR(
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

export function useFetchIndustryAssociationRecruitmentStepCandidateList(
  jobId: any,
  params: any,
) {
  return useAxiosSWR(
    jobId && params ? [API_JOBS_CANDIDATES + '/' + jobId, params] : null,
  );
}

export function useFetchCandidateStepSchedule(scheduleId: any) {
  return useAxiosSWR(
    scheduleId ? API_CANDIDATE_STEP_SCHEDULE + '/' + scheduleId : null,
  );
}

export function useFetchCandidate(applicationId: any) {
  return useAxiosSWR(
    applicationId ? API_CANDIDATE_UPDATE + applicationId : null,
  );
}

export function useFetchInterviewSchedule(stepId: number | null) {
  return useAxiosSWR(
    stepId ? API_RECRUITMENT_STEPS + '/' + stepId + '/schedules' : null,
  );
}
