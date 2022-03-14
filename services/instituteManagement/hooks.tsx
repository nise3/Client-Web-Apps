import {
  useAxiosSWR,
  useDataLocalizationAxiosSWR,
} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_BATCHES,
  API_BATCHES_TO_ASSIGN,
  API_BRANCHES,
  API_COURSE_ENROLLMENTS,
  API_COURSES,
  API_HUMAN_RESOURCE_DEMAND,
  API_INDUSTRY_PUBLICATIONS,
  API_INSTITUTE_PROFILE,
  API_INSTITUTE_QUESTION_BANK,
  API_INSTITUTE_TRAINEE_YOUTHS,
  API_INSTITUTES,
  API_PROGRAMMES,
  API_PROGRAMS,
  API_PUBLIC_COURSE_DETAILS,
  API_PUBLIC_COURSE_LIST,
  API_PUBLIC_INSTITUTE_DETAILS,
  API_PUBLIC_INSTITUTES,
  API_PUBLIC_PROGRAMS,
  API_PUBLIC_TRAINING_CENTERS,
  API_RPL_APPLICATION,
  API_TRAINERS,
  API_TRAINING_CENTERS,
} from '../../@softbd/common/apiRoutes';

export function useFetchInstitute(instituteId: number | null) {
  return useAxiosSWR(instituteId ? API_INSTITUTES + '/' + instituteId : null);
}

export function useFetchInstituteProfile() {
  return useAxiosSWR(API_INSTITUTE_PROFILE);
}

export function useFetchPublicInstitutes(params: any) {
  return useDataLocalizationAxiosSWR([API_PUBLIC_INSTITUTES, params]);
}

export function useFetchPublicInstituteDetails() {
  return useDataLocalizationAxiosSWR(API_PUBLIC_INSTITUTE_DETAILS);
}

export function useFetchPublicInstituteDetailsWithParams(params: any) {
  return useDataLocalizationAxiosSWR([API_PUBLIC_INSTITUTE_DETAILS, params]);
}

export function useFetchAllInstitutes(params: any) {
  return useAxiosSWR(params ? [API_INSTITUTES, params] : null);
}

export function useFetchBranch(branchId: number | null) {
  return useAxiosSWR(branchId ? API_BRANCHES + '/' + branchId : null);
}

export function useFetchBranches(params: any) {
  return useAxiosSWR(params ? [API_BRANCHES, params] : null);
}

export function useFetchProgramme(programmeId: number | null) {
  return useAxiosSWR(programmeId ? API_PROGRAMMES + '/' + programmeId : null);
}

export function useFetchPublication(publicationId: number | null) {
  return useAxiosSWR(
    publicationId ? API_INDUSTRY_PUBLICATIONS + '/' + publicationId : null,
  );
}

export function useFetchPublicPrograms(params: any) {
  return useDataLocalizationAxiosSWR([API_PUBLIC_PROGRAMS, params]);
}

export function useFetchPrograms(params: any) {
  return useDataLocalizationAxiosSWR([API_PROGRAMS, params]);
}

export function useFetchTrainingCenter(trainingCenterId: number | null) {
  return useAxiosSWR(
    trainingCenterId ? API_TRAINING_CENTERS + '/' + trainingCenterId : null,
  );
}

export function useFetchTrainingCenters(params: any) {
  return useAxiosSWR(params ? [API_TRAINING_CENTERS, params] : null);
}

export function useFetchCourse(courseId: number | null) {
  return useAxiosSWR(courseId ? API_COURSES + '/' + courseId : null);
}

export function useFetchCourses(params: any) {
  return useAxiosSWR([API_COURSES, params]);
}

export function useFetchCourseList(pathVariable: string, params: any) {
  return useDataLocalizationAxiosSWR(
    params
      ? [
          pathVariable
            ? API_PUBLIC_COURSE_LIST + '/' + pathVariable
            : API_PUBLIC_COURSE_LIST,
          params,
        ]
      : null,
  );
}

export function useFetchUpcomingCourseList(params: any) {
  return useAxiosSWR([API_PUBLIC_COURSE_LIST, params]);
}

export function useFetchPublicCourseDetailsWithParams(
  courseId: number | null,
  params: any,
) {
  return useDataLocalizationAxiosSWR(
    courseId ? [API_PUBLIC_COURSE_DETAILS + '/' + courseId, params] : null,
  );
}

export function useFetchPublicCourseDetails(courseId: number | null) {
  return useAxiosSWR(
    courseId ? API_PUBLIC_COURSE_DETAILS + '/' + courseId : null,
  );
}

export function useFetchBatch(batchId: number | null) {
  return useAxiosSWR(batchId ? API_BATCHES + '/' + batchId : null);
}

export function useFetchBatches(params: any) {
  return useAxiosSWR([API_BATCHES, params]);
}

export function useFetchTrainer(trainerId: number | null) {
  return useAxiosSWR(trainerId ? API_TRAINERS + '/' + trainerId : null);
}

export function useFetchTrainers(params: any) {
  return useAxiosSWR(params ? [API_TRAINERS, params] : null);
}

export function useFetchPublicTrainingCenters(params: any) {
  return useDataLocalizationAxiosSWR(
    params ? [API_PUBLIC_TRAINING_CENTERS, params] : null,
  );
}

/** fetches a single application's details */
export function useFetchApplicationDetails(applicationId: number | null) {
  return useAxiosSWR(
    applicationId ? API_COURSE_ENROLLMENTS + '/' + applicationId : null,
  );
}
/** fetches a single assessment's details */
export function useFetchAssessmentDetails(assessmentId: number | null) {
  return useAxiosSWR(
    assessmentId ? API_RPL_APPLICATION + '/' + assessmentId : null,
  );
}

/** Fetches the batches available for a course */
export function useFetchBatchesToAssign(courseId: number | null) {
  return useAxiosSWR(
    courseId ? API_COURSES + '/' + courseId + API_BATCHES_TO_ASSIGN : null,
  );
}

/**hr-demand**/
export function useFetchHrDemand(hrDemandId: any) {
  return useAxiosSWR(
    hrDemandId ? API_HUMAN_RESOURCE_DEMAND + '/' + hrDemandId : null,
  );
}

export function useFetchInstituteTraineeYouths() {
  return useAxiosSWR(API_INSTITUTE_TRAINEE_YOUTHS);
}

/**
 * Question Bank
 */
export const useFetchQuestionBank = (questionId: number | null) => {
  return useAxiosSWR(
    questionId ? API_INSTITUTE_QUESTION_BANK + '/' + questionId : null,
  );
};

export const useFetchTrainingCentersWithBatches = (courseId: number | null) => {
  return useAxiosSWR(
    courseId
      ? API_PUBLIC_COURSE_DETAILS + '/' + courseId + '/training-centers/batches'
      : null,
  );
};
