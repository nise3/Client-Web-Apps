import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_SKILLS} from '../../@softbd/common/apiRoutes';

/**
 * @deprecated
 */
export const getAllSkills = async (params = {}) => {
  try {
    let response: any = await apiGet(API_SKILLS, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 */
export const getSkill = async (SkillId: number) => {
  try {
    let response: any = await apiGet(API_SKILLS + '/' + SkillId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createSkill = async (data: Skill) => {
  try {
    let response: any = await apiPost(API_SKILLS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateSkill = async (SkillId: number, data: Skill) => {
  try {
    let response: any = await apiPut(API_SKILLS + '/' + SkillId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteSkill = async (SkillId: number) => {
  try {
    let response: any = await apiDelete(API_SKILLS + '/' + SkillId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
