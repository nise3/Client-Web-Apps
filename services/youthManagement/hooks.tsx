import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_YOUTH_JOB_EXPERIENCES,
  API_YOUTH_PROFILE,
  API_YOUTH_SKILLS,
  API_YOUTH_REFERENCES,
  API_YOUTH_EDUCATION_EXAMS_BOARDS_EDUGROUPS_AND_SUBJECTS,
  API_YOUTH_EDUCATION,
  API_YOUTH_PORTFOLIOS,
  API_YOUTH_CERTIFICATES,
  API_YOUTH_LANGUAGE_PROFICIENCIES,
  API_YOUTH_GUARDIANS_LIST,
  API_YOUTH_LIST,
} from '../../@softbd/common/apiRoutes';

export function useFetchYouthSkills(params: any) {
  return useAxiosSWR([API_YOUTH_SKILLS, params]);
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
  return useAxiosSWR(API_YOUTH_GUARDIANS_LIST);
}

export function useFetchYouths() {
  return useAxiosSWR(API_YOUTH_LIST);
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
