import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_YOUTH_JOB_EXPERIENCES,
  API_YOUTH_PROFILE,
  API_YOUTH_SKILLS,
  API_YOUTH_REFERENCES,
  API_YOUTH_CERTIFICATES,
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
