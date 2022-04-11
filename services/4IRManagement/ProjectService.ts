import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_PROJECTS} from '../../@softbd/common/apiRoutes';
import {IProject} from '../../shared/Interface/4IR.interface';

export const getAllProjects = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_PROJECTS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getProject = async (projectId: number) => {
  try {
    let response: any = await apiGet(API_4IR_PROJECTS + '/' + projectId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createProject = async (data: IProject) => {
  try {
    let response: any = await apiPost(API_4IR_PROJECTS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateProject = async (projectId: number, data: IProject) => {
  try {
    let response: any = await apiPut(API_4IR_PROJECTS + '/' + projectId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteProject = async (projectId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_PROJECTS + '/' + projectId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
