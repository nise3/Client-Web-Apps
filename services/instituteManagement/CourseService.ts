import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';

const API_COURSES = '/courses';

export const getAllCourses = async (params = {}) => {
  try {
    let response: any = await apiGet(API_COURSES, {params});
    return response.data.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getCourse = async (courseId: number) => {
  try {
    let response: any = await apiGet(API_COURSES + '/' + courseId);
    return response.data.data;
  } catch (catchBlockHandler) {}
};

export const createCourse = async (data: Course) => {
  try {
    let response: any = await apiPost(API_COURSES, data);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateCourse = async (courseId: number, data: Course) => {
  try {
    let response: any = await apiPut(API_COURSES + '/' + courseId, data);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteCourse = async (courseId: number) => {
  try {
    let response: any = await apiDelete(API_COURSES + '/' + courseId);
    return response.data._response_status.success;
  } catch (error) {
    catchBlockHandler(error);
  }
};
