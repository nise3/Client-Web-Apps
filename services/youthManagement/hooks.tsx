import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_LANGUAGES,
  API_YOUTH_ADDRESSES,
  API_YOUTH_CERTIFICATES,
  API_YOUTH_COURSES,
  API_YOUTH_EDUCATION,
  API_YOUTH_EDUCATION_EXAMS_BOARDS_EDUGROUPS_AND_SUBJECTS,
  API_YOUTH_FEED_STATISTICS,
  API_YOUTH_GUARDIANS,
  API_YOUTH_JOB_EXPERIENCES,
  API_YOUTH_LANGUAGE_PROFICIENCIES,
  API_YOUTH_LIST,
  API_YOUTH_PORTFOLIOS,
  API_YOUTH_PROFILE,
  API_YOUTH_REFERENCES,
  API_SKILLS,
} from '../../@softbd/common/apiRoutes';

export function useFetchSkills(params: any) {
  return useAxiosSWR([API_SKILLS, params]);
}

export function useFetchYouthProfile() {
  return useAxiosSWR(API_YOUTH_PROFILE);
}

export function useFetchYouthJobExperiences(params: any) {
  return useAxiosSWR([API_YOUTH_JOB_EXPERIENCES, params]);
}

export function useFetchJobExperience(jobExperienceId: number | null) {
  return useAxiosSWR(
    jobExperienceId ? API_YOUTH_JOB_EXPERIENCES + '/' + jobExperienceId : null,
  );
}

export function useFetchYouthCertificates(params?: any) {
  return useAxiosSWR([API_YOUTH_CERTIFICATES, params]);
}

export function useFetchYouthCertificate(certificateId: number | null) {
  return useAxiosSWR(
    certificateId ? API_YOUTH_CERTIFICATES + '/' + certificateId : null,
  );
}

export function useFetchYouthReferences() {
  return useAxiosSWR(API_YOUTH_REFERENCES);
}

export function useFetchReference(referenceId: number | null) {
  return useAxiosSWR(
    referenceId ? API_YOUTH_REFERENCES + '/' + referenceId : null,
  );
}

export function useFetchEducations() {
  return useAxiosSWR(API_YOUTH_EDUCATION);
}

export function useFetchEducation(educationId: number | null) {
  return useAxiosSWR(
    educationId ? API_YOUTH_EDUCATION + '/' + educationId : null,
  );
}

export function useFetchEducationExamsBoardsEduGroupsAndSubjects() {
  return useAxiosSWR(API_YOUTH_EDUCATION_EXAMS_BOARDS_EDUGROUPS_AND_SUBJECTS);
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
  return useAxiosSWR(API_YOUTH_LANGUAGE_PROFICIENCIES);
}

/** fetches guardians list of the youth */
export function useFetchGuardians() {
  return useAxiosSWR(API_YOUTH_GUARDIANS);
}

/** fetches a single guardian's info */
export function useFetchGuardian(guardianId: number | null) {
  return useAxiosSWR(
    guardianId ? API_YOUTH_GUARDIANS + '/' + guardianId : null,
  );
}

/** fetches a single youth's details */
export function useFetchYouthDetails(youthId: number | null | string) {
  return useAxiosSWR(youthId ? API_YOUTH_LIST + '/' + youthId : null);
}

export function useFetchYouths(params: any) {
  return useAxiosSWR([API_YOUTH_LIST, params]);
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
  return useAxiosSWR([API_YOUTH_COURSES, params]);
}

export function useFetchYouthFeedStatistics() {
  return useAxiosSWR([API_YOUTH_FEED_STATISTICS]);
}

export function useFetchLanguages() {
  return useAxiosSWR([API_LANGUAGES]);
}

export function useFetchYouthAddresses(params: any) {
  return useAxiosSWR([API_YOUTH_ADDRESSES, params]);
}

export function useFetchYouthAddress(addressId: number | null) {
  return useAxiosSWR(addressId ? API_YOUTH_ADDRESSES + '/' + addressId : null);
}
