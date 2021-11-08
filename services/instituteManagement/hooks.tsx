import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_BATCHES,
  API_BRANCHES,
  API_COURSE_DETAILS,
  API_COURSES,
  API_FONT_END_CONTACT_MAP,
  API_FRONT_END_GALLERY_CATEGORY_LIST,
  API_FRONT_END_GALLERY_LIST,
  API_FRONT_END_VIDEOS_CATEGORY_LIST,
  API_FRONT_END_VIDEOS_LIST,
  API_INSTITUTES,
  API_PROGRAMMES,
  API_TRAINERS,
  API_TRAINING_CENTERS,
  API_FRONT_END_RECENT_ACTIVITY_LIST,
  API_FRONT_END_ALL_ACTIVITY_LIST,
  API_FRONT_END_FAQ,
  API_PUBLIC_COURSE_LIST,
  API_COURSE_ENROLLMENTS,
  API_ALL_FAQS,
} from '../../@softbd/common/apiRoutes';

export function useFetchInstitute(instituteId: number | null) {
  return useAxiosSWR(instituteId ? API_INSTITUTES + '/' + instituteId : null);
}

export function useFetchInstitutes(params: any) {
  return useAxiosSWR([API_INSTITUTES, params]);
}

export function useFetchInstitutesGallery() {
  return useAxiosSWR(API_FRONT_END_GALLERY_LIST);
}

export function useFetchInstitutesGalleryCategory() {
  return useAxiosSWR(API_FRONT_END_GALLERY_CATEGORY_LIST);
}

export function useFetchInstitutesVideos() {
  return useAxiosSWR(API_FRONT_END_VIDEOS_LIST);
}

export function useFetchInstitutesVideoCategory() {
  return useAxiosSWR(API_FRONT_END_VIDEOS_CATEGORY_LIST);
}

export function useFetchBranch(branchId: number | null) {
  return useAxiosSWR(branchId ? API_BRANCHES + '/' + branchId : null);
}

export function useFetchBranches(params: any) {
  return useAxiosSWR([API_BRANCHES, params]);
}

export function useFetchProgramme(programmeId: number | null) {
  return useAxiosSWR(programmeId ? API_PROGRAMMES + '/' + programmeId : null);
}

export function useFetchProgrammes(params: any) {
  return useAxiosSWR([API_PROGRAMMES, params]);
}

export function useFetchTrainingCenter(trainingCenterId: number | null) {
  return useAxiosSWR(
    trainingCenterId ? API_TRAINING_CENTERS + '/' + trainingCenterId : null,
  );
}

export function useFetchTrainingCenters(params: any) {
  return useAxiosSWR([API_TRAINING_CENTERS, params]);
}

export function useFetchCourse(courseId: number | null) {
  return useAxiosSWR(courseId ? API_COURSES + '/' + courseId : null);
}

export function useFetchCourses(params: any) {
  return useAxiosSWR([API_COURSES, params]);
}

export function useFetchCourseList(pathVariable: string, params: any) {
  return useAxiosSWR([
    pathVariable
      ? API_PUBLIC_COURSE_LIST + pathVariable
      : API_PUBLIC_COURSE_LIST,
    params,
  ]);
}

export function useFetchCourseDetails(courseId: number | null) {
  return useAxiosSWR(courseId ? API_COURSE_DETAILS + '/' + courseId : null);
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
  return useAxiosSWR([API_TRAINERS, params]);
}

export function useFetchInstitutesContactMap() {
  return useAxiosSWR([API_FONT_END_CONTACT_MAP]);
}

export function useFetchInstitutesRecentActivity() {
  return useAxiosSWR([API_FRONT_END_RECENT_ACTIVITY_LIST]);
}

export function useFetchInstitutesAllActivity() {
  return useAxiosSWR([API_FRONT_END_ALL_ACTIVITY_LIST]);
}

export function useFetchInstitutesFAQ() {
  return useAxiosSWR([API_FRONT_END_FAQ]);
}

/** fetches a single application's details */
export function useFetchApplicationDetails(applicationId: number | null) {
  return useAxiosSWR(
    applicationId ? API_COURSE_ENROLLMENTS + '/' + applicationId : null,
  );
}

/** Fetches the batches available for a course */
export function useFetchBatchesToAssign(courseId: number | null) {
  return useAxiosSWR(
    courseId
      ? API_COURSES + '/' + courseId + '/' + 'training_centers/batches'
      : null,
  );
}

/** fetches a single FAQ's details */
export function useFetchFAQ(faqId: number | null) {
  return useAxiosSWR(faqId ? API_ALL_FAQS + '/' + faqId : null);
}
