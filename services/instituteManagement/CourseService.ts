import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {INSTITUTE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_COURSES = INSTITUTE_SERVICE_PATH + '/courses';

export const getAllCourses = async (params = {}) => {
  try {
    let response: any = await apiGet(API_COURSES, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getCourse = async (courseId: number) => {
  try {
    let response: any = await apiGet(API_COURSES + '/' + courseId);
    return response.data;
  } catch (catchBlockHandler) {}
};

export const createCourse = async (data: Course) => {
  try {
    let response: any = await apiPost(API_COURSES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCourse = async (courseId: number, data: Course) => {
  try {
    let response: any = await apiPut(API_COURSES + '/' + courseId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCourse = async (courseId: number) => {
  try {
    let response: any = await apiDelete(API_COURSES + '/' + courseId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
