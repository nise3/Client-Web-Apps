import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_BATCHES,
  API_BRANCHES,
  API_COURSES,
  API_FRONT_END_GALLERY_CATEGORY_LIST,
  API_FRONT_END_GALLERY_LIST,
  API_FRONT_END_VIDEOS_CATEGORY_LIST,
  API_FRONT_END_VIDEOS_LIST,
  API_INSTITUTES,
  API_PROGRAMMES,
  API_TRAINERS,
  API_TRAINING_CENTERS,
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
