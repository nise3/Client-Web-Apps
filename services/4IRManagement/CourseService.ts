import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_4IR_COURSE,
  API_4IR_CS,
  API_COURSES,
} from '../../@softbd/common/apiRoutes';

export const getAllCS = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_CS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getCS = async (csId: number) => {
  try {
    let response: any = await apiGet(API_4IR_CS + '/' + csId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createFourIRCourse = async (data: any) => {
  try {
    let response: any = await apiPost(API_4IR_COURSE, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateFourIRCourse = async (courseId: number, data: any) => {
  try {
    let response: any = await apiPut(API_4IR_COURSE + '/' + courseId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/** for deleting the course the earlier course api will be use, not the 4ir */
export const deleteFourIRCourse = async (courseId: number) => {
  try {
    let response: any = await apiDelete(API_COURSES + '/' + courseId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
