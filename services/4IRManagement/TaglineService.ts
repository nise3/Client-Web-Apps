import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {
  API_4IR_PROJECTS,
  API_4IR_TAGLINES,
} from '../../@softbd/common/apiRoutes';
import {ITagLine} from '../../shared/Interface/4IR.interface';

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

export const createTagline = async (data: ITagLine) => {
  try {
    let response: any = await apiPost(API_4IR_TAGLINES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateTagline = async (taglineId: number, data: ITagLine) => {
  try {
    let response: any = await apiPut(API_4IR_TAGLINES + '/' + taglineId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteTagline = async (taglineId: number) => {
  try {
    let response: any = await apiDelete(API_4IR_TAGLINES + '/' + taglineId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
