import {
  useAxiosSWR,
  useDataLocalizationAxiosSWR,
} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_LANGUAGES,
  API_PUBLIC_GET_BUSINESS_AREAS,
  API_PUBLIC_GET_EXPERIENCE_AREAS,
  API_PUBLIC_RPL_APPLICATIONS,
  API_SKILLS,
  API_YOUTH_ADDRESSES,
  API_YOUTH_CERTIFICATES,
  API_YOUTH_COURSES,
  API_YOUTH_EDUCATION,
  API_YOUTH_EDUCATION_EXAMS_BOARDS_EDUGROUPS_AND_SUBJECTS,
  API_YOUTH_FEED_STATISTICS,
  API_YOUTH_GUARDIANS,
  API_YOUTH_JOB_EXPERIENCES,
  API_YOUTH_LANGUAGE_PROFICIENCIES,
  API_YOUTH_MY_JOBS,
  API_YOUTH_PORTFOLIOS,
  API_YOUTH_PROFILE,
  API_YOUTH_REFERENCES,
  API_YOUTHS,
  API_YOUTH_FEED_DATA_LIST,
} from '../../@softbd/common/apiRoutes';
import { CERTIFICATE_TYPE_API_URL } from '../../modules/dashboard/certificate-issue/certificate-issue-constant';

export function useFetchSkill(skillId: number | null) {
  return useAxiosSWR(skillId ? API_SKILLS + '/' + skillId : null);
}

export function useFetchSkills(params: any) {
  return useAxiosSWR([API_SKILLS, params]);
}

export function useFetchPublicSkills(params: any) {
  return useDataLocalizationAxiosSWR([API_SKILLS, params]);
}
export function useFetchCertificateIssue(params: any) {
  return useDataLocalizationAxiosSWR([CERTIFICATE_TYPE_API_URL + 'certificates', params]);
}

export function useFetchYouthProfile() {
  return useAxiosSWR(API_YOUTH_PROFILE);
}

export function useFetchYouthFeedDataList(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_YOUTH_FEED_DATA_LIST, params] : null,
  );
}

export function useFetchMyJobs(params: any) {
  return useAxiosSWR(params ? [API_YOUTH_MY_JOBS, params] : null);
}

export function useFetchYouthJobExperiences() {
  return useDataLocalizationAxiosSWR(API_YOUTH_JOB_EXPERIENCES);
}

export function useFetchJobExperience(jobExperienceId: number | null) {
  return useAxiosSWR(
    jobExperienceId ? API_YOUTH_JOB_EXPERIENCES + '/' + jobExperienceId : null,
  );
}

export function useFetchPublicAreaOfBusiness() {
  return useAxiosSWR(API_PUBLIC_GET_BUSINESS_AREAS);
}

export function useFetchPublicAreaOfExperience() {
  return useAxiosSWR(API_PUBLIC_GET_EXPERIENCE_AREAS);
}

export function useFetchYouthCertificates(params?: any) {
  return useDataLocalizationAxiosSWR([API_YOUTH_CERTIFICATES, params]);
}

export function useFetchYouthCertificate(certificateId: number | null) {
  return useAxiosSWR(
    certificateId ? API_YOUTH_CERTIFICATES + '/' + certificateId : null,
  );
}

export function useFetchYouthReferences() {
  return useDataLocalizationAxiosSWR(API_YOUTH_REFERENCES);
}

export function useFetchReference(referenceId: number | null) {
  return useAxiosSWR(
    referenceId ? API_YOUTH_REFERENCES + '/' + referenceId : null,
  );
}

export function useFetchEducations() {
  return useDataLocalizationAxiosSWR(API_YOUTH_EDUCATION);
}

export function useFetchEducation(educationId: number | null) {
  return useAxiosSWR(
    educationId ? API_YOUTH_EDUCATION + '/' + educationId : null,
  );
}

export function useFetchEducationExamsBoardsEduGroupsAndSubjects() {
  return useDataLocalizationAxiosSWR(
    API_YOUTH_EDUCATION_EXAMS_BOARDS_EDUGROUPS_AND_SUBJECTS,
  );
}

export function useFetchPortfolios() {
  return useAxiosSWR(API_YOUTH_PORTFOLIOS);
}

export function useFetchPortfolio(portfolioId: number | null) {
  return useAxiosSWR(
    portfolioId ? API_YOUTH_PORTFOLIOS + '/' + portfolioId : null,
  );
}

export function useFetchLanguageProficiencies() {
  return useDataLocalizationAxiosSWR(API_YOUTH_LANGUAGE_PROFICIENCIES);
}

/** fetches guardians list of the youth */
export function useFetchGuardians() {
  return useDataLocalizationAxiosSWR(API_YOUTH_GUARDIANS);
}

/** fetches a single guardian's info */
export function useFetchGuardian(guardianId: number | null) {
  return useAxiosSWR(
    guardianId ? API_YOUTH_GUARDIANS + '/' + guardianId : null,
  );
}

/** fetches a single youth's details */
export function useFetchYouthDetails(youthId: number | null | string) {
  return useAxiosSWR(youthId ? API_YOUTHS + '/' + youthId : null);
}

export function useFetchYouths(params: any) {
  return useDataLocalizationAxiosSWR([API_YOUTHS, params]);
}

export function useFetchLanguageProficiency(
  languageProficiencyId: number | null,
) {
  return useAxiosSWR(
    languageProficiencyId
      ? API_YOUTH_LANGUAGE_PROFICIENCIES + '/' + languageProficiencyId
      : null,
  );
}

export function useFetchYouthCourses(params: any) {
  return useDataLocalizationAxiosSWR([API_YOUTH_COURSES, params]);
}

export function useFetchYouthFeedStatistics() {
  return useAxiosSWR([API_YOUTH_FEED_STATISTICS]);
}

export function useFetchLanguages() {
  return useDataLocalizationAxiosSWR([API_LANGUAGES]);
}

export function useFetchYouthAddresses(params: any) {
  return useDataLocalizationAxiosSWR([API_YOUTH_ADDRESSES, params]);
}

export function useFetchYouthAddress(addressId: number | null) {
  return useAxiosSWR(addressId ? API_YOUTH_ADDRESSES + '/' + addressId : null);
}

export function useFetchPublicRplApplication(application_id: number | null) {
  return useAxiosSWR(
    application_id ? API_PUBLIC_RPL_APPLICATIONS + '/' + application_id : null,
  );
}
