import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_RPL_QUESTION_BANK,
  API_RPL_ASSESSMENTS,
  API_PUBLIC_REGISTERED_TRAINING_ORGANIZATIONS,
  API_PUBLIC_RPL_OCCUPATIONS,
  API_PUBLIC_RPL_SECTORS,
  API_PUBLIC_RTO_COUNTRIES,
  API_PUBLIC_RPL_ASSESSMENTS_QUESTIONS,
  API_REGISTERED_TRAINING_ORGANIZATIONS,
  API_RPL_LEVELS,
  API_RPL_OCCUPATIONS,
  API_RPL_PUBLIC_LEVELS,
  API_RPL_SECTORS,
  API_RTO_BATCH,
  API_RTO_COUNTRIES,
  API_RPL_SUBJECTS,
  API_RPL_ASSESSMENT_QUESTIONS,
  API_RPL_ASSESSMENT_QUESTION_SETS,
} from '../../@softbd/common/apiRoutes';

export function useFetchRTO(rtoId: number | null) {
  return useAxiosSWR(
    rtoId ? API_REGISTERED_TRAINING_ORGANIZATIONS + '/' + rtoId : null,
  );
}

export function useFetchRTOCountries() {
  return useAxiosSWR(API_RTO_COUNTRIES);
}

export function useFetchPublicRTOCountries(params: any) {
  return useAxiosSWR(params ? [API_PUBLIC_RTO_COUNTRIES, params] : null);
}

export function useFetchRPLSector(RPLSectorId: number | null) {
  return useAxiosSWR(RPLSectorId ? API_RPL_SECTORS + '/' + RPLSectorId : null);
}

export function useFetchRPLSectors(params: any) {
  return useAxiosSWR(params ? [API_RPL_SECTORS, params] : null);
}

export function useFetchPublicRPLSectors(params: any) {
  return useAxiosSWR(params ? [API_PUBLIC_RPL_SECTORS, params] : null);
}

export function useFetchRPLOccupation(RPLOccupationId: number | null) {
  return useAxiosSWR(
    RPLOccupationId ? API_RPL_OCCUPATIONS + '/' + RPLOccupationId : null,
  );
}

export function useFetchRPLOccupations(params: any = null) {
  return useAxiosSWR(params ? [API_RPL_OCCUPATIONS, params] : null);
}

export function useFetchPublicRPLOccupations(params: any) {
  return useAxiosSWR(params ? [API_PUBLIC_RPL_OCCUPATIONS, params] : null);
}

export function useFetchRPLLevels(params: any = null) {
  return useAxiosSWR(params ? [API_RPL_LEVELS, params] : null);
}

export function useFetchPublicRPLLevels(params: any) {
  return useAxiosSWR(params ? [API_RPL_PUBLIC_LEVELS, params] : null);
}

export function useFetchRPLLevel(rplLevelId: number | null) {
  return useAxiosSWR(rplLevelId ? API_RPL_LEVELS + '/' + rplLevelId : null);
}

export function useFetchRPLSubject(subjectId: number | null) {
  return useAxiosSWR(subjectId ? API_RPL_SUBJECTS + '/' + subjectId : null);
}

export function useFetchRPLSubjects(params: any) {
  return useAxiosSWR([API_RPL_SUBJECTS, params]);
}

export function useFetchRPLAssessments(params: any) {
  return useAxiosSWR([API_RPL_ASSESSMENTS, params]);
}

export function useFetchRPLAssessment(assessmentId: number | null) {
  return useAxiosSWR(
    assessmentId ? API_RPL_ASSESSMENTS + '/' + assessmentId : null,
  );
}

export function useFetchRTOS(params: any) {
  return useAxiosSWR(
    params ? [API_REGISTERED_TRAINING_ORGANIZATIONS, params] : null,
  );
}

export function useFetchPublicRTOS(params: any) {
  return useAxiosSWR(
    params ? [API_PUBLIC_REGISTERED_TRAINING_ORGANIZATIONS, params] : null,
  );
}

export function useFetchRPLQuestionBanks(params: any) {
  return useAxiosSWR(params ? [API_RPL_QUESTION_BANK, params] : null);
}

export function useFetchRPLQuestionBank(questionId: number | null) {
  return useAxiosSWR(
    questionId ? API_RPL_QUESTION_BANK + '/' + questionId : null,
  );
}

export function useFetchRTOBatch(rtoBatchId: number | null) {
  return useAxiosSWR(rtoBatchId ? API_RTO_BATCH + '/' + rtoBatchId : null);
}

export function useFetchRTOBatches(params: any) {
  return useAxiosSWR(params ? [API_RTO_BATCH, params] : null);
}

export function useFetchPublicYouthAssessmentQuestions(params: any) {
  return useAxiosSWR(
    params ? [API_PUBLIC_RPL_ASSESSMENTS_QUESTIONS, params] : null,
  );
}

export function useFetchRPLAssessmentQuestions(params: any) {
  return useAxiosSWR(params ? [API_RPL_ASSESSMENT_QUESTIONS, params] : null);
}

export function useFetchRPLAssessmentQuestionSets(params: any) {
  return useAxiosSWR(
    params ? [API_RPL_ASSESSMENT_QUESTION_SETS, params] : null,
  );
}

export function useFetchRPLAssessmentQuestionSet(questionSetId: number | null) {
  return useAxiosSWR(
    questionSetId
      ? API_RPL_ASSESSMENT_QUESTION_SETS + '/' + questionSetId
      : null,
  );
}

export function useFetchResultTypes() {
  return useAxiosSWR('http://192.168.13.215:8001/api/v1/certificate-types');
}
