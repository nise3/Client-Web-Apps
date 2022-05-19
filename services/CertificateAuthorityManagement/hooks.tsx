import {
  useAxiosSWR,
  useDataLocalizationAxiosSWR,
} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_CERTIFICATES,
  API_PUBLIC_REGISTERED_TRAINING_ORGANIZATIONS,
  API_PUBLIC_RPL_ASSESSMENTS_QUESTIONS,
  API_PUBLIC_RPL_OCCUPATIONS,
  API_PUBLIC_RPL_SECTORS,
  API_PUBLIC_RTO_COUNTRIES,
  API_REGISTERED_TRAINING_ORGANIZATIONS,
  API_RPL_ASSESSMENTS,
  API_RPL_ASSESSMENT_QUESTIONS,
  API_RPL_ASSESSMENT_QUESTION_SETS,
  API_RPL_LEVELS,
  API_RPL_OCCUPATIONS,
  API_RPL_PUBLIC_LEVELS,
  API_RPL_QUESTION_BANK,
  API_RPL_SECTORS,
  API_RPL_SUBJECTS,
  API_RTO_BATCH,
  API_RTO_COUNTRIES,
} from '../../@softbd/common/apiRoutes';
import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';

export function useFetchRTO(rtoId: number | null) {
  return useAxiosSWR(
    rtoId ? API_REGISTERED_TRAINING_ORGANIZATIONS + '/' + rtoId : null,
  );
}

export function useFetchRTOCountries() {
  return useAxiosSWR(API_RTO_COUNTRIES);
}

export function useFetchLocalizedRTOCountries() {
  return useDataLocalizationAxiosSWR(API_RTO_COUNTRIES);
}

export function useFetchPublicRTOCountries(params: any) {
  return useAxiosSWR(params ? [API_PUBLIC_RTO_COUNTRIES, params] : null);
}

export function useFetchLocalizedPublicRTOCountries(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_PUBLIC_RTO_COUNTRIES, params] : null,
  );
}

export function useFetchRPLSector(RPLSectorId: number | null) {
  return useAxiosSWR(RPLSectorId ? API_RPL_SECTORS + '/' + RPLSectorId : null);
}

export function useFetchRPLSectors(params: any) {
  return useAxiosSWR(params ? [API_RPL_SECTORS, params] : null);
}

export function useFetchLocalizedRPLSectors(params: any) {
  return useDataLocalizationAxiosSWR(params ? [API_RPL_SECTORS, params] : null);
}

export function useFetchPublicRPLSectors(params: any) {
  return useAxiosSWR(params ? [API_PUBLIC_RPL_SECTORS, params] : null);
}

export function useFetchLocalizedPublicRPLSectors(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_PUBLIC_RPL_SECTORS, params] : null,
  );
}

export function useFetchRPLOccupation(RPLOccupationId: number | null) {
  return useAxiosSWR(
    RPLOccupationId ? API_RPL_OCCUPATIONS + '/' + RPLOccupationId : null,
  );
}

export function useFetchRPLOccupations(params: any = null) {
  return useAxiosSWR(params ? [API_RPL_OCCUPATIONS, params] : null);
}

export function useFetchLocalizedRPLOccupations(params: any = null) {
  return useDataLocalizationAxiosSWR(
    params ? [API_RPL_OCCUPATIONS, params] : null,
  );
}

export function useFetchPublicRPLOccupations(params: any) {
  return useAxiosSWR(params ? [API_PUBLIC_RPL_OCCUPATIONS, params] : null);
}

export function useFetchLocalizedPublicRPLOccupations(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_PUBLIC_RPL_OCCUPATIONS, params] : null,
  );
}

export function useFetchRPLLevels(params: any = null) {
  return useAxiosSWR(params ? [API_RPL_LEVELS, params] : null);
}

export function useFetchLocalizedRPLLevels(params: any = null) {
  return useDataLocalizationAxiosSWR(params ? [API_RPL_LEVELS, params] : null);
}

export function useFetchPublicRPLLevels(params: any) {
  return useAxiosSWR(params ? [API_RPL_PUBLIC_LEVELS, params] : null);
}

export function useFetchLocalizedPublicRPLLevels(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_RPL_PUBLIC_LEVELS, params] : null,
  );
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

export function useFetchLocalizedRPLSubjects(params: any) {
  return useDataLocalizationAxiosSWR([API_RPL_SUBJECTS, params]);
}

export function useFetchRPLAssessments(params: any) {
  return useAxiosSWR([API_RPL_ASSESSMENTS, params]);
}

export function useFetchLocalizedRPLAssessments(params: any) {
  return useDataLocalizationAxiosSWR([API_RPL_ASSESSMENTS, params]);
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

export function useFetchLocalizedPublicRTOS(params: any) {
  return useDataLocalizationAxiosSWR(
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

export function useFetchLocalizedRTOBatches(params: any) {
  return useDataLocalizationAxiosSWR(params ? [API_RTO_BATCH, params] : null);
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

export function useFetchCertificates() {
  return useAxiosSWR(API_CERTIFICATES);
}

export function useFetchCertificate(certifcateId: number | null) {
  return useAxiosSWR(`${API_CERTIFICATES}/${certifcateId}`);
}

export function useFetchResultTypes() {
  return {
    order: 'ASC',
    data: [
      {
        id: 1,
        title: 'Competent',
      },
      {
        id: 2,
        title: 'Not Competent',
      },
      {
        id: 3,
        title: 'Grading',
      },
      {
        id: 4,
        title: 'Marks',
      },
      {
        id: 5,
        title: 'Participation',
      },
    ],
    _response_status: {
      success: true,
      code: 200,
      query_time: 0,
    },
  };
}
