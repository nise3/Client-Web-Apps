import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_SKILLS} from '../../@softbd/common/apiRoutes';
import {ISkill} from '../../shared/Interface/organization.interface';

export const getAllSkills = async () => {
  try {
    let response: any = await apiGet(API_SKILLS);
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

export const createSkill = async (data: ISkill) => {
  try {
    let response: any = await apiPost<ISkill>(API_SKILLS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateSkill = async (SkillId: number, data: ISkill) => {
  try {
    let response: any = await apiPut<ISkill>(API_SKILLS + '/' + SkillId, data);
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
