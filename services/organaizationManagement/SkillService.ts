import {apiDelete, apiGet, apiPost, apiPut} from "../../common/api";
import {catchBlockHandler} from "../../common/helpers";
import {ORGANIZATION_SERVICE_PATH} from "../../common/apiRoutes";

const API_SKILLS = ORGANIZATION_SERVICE_PATH + '/skills';

export const getAllSkills = async () => {
    try {
        let response: any = await apiGet(API_SKILLS);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const getSkill = async (SkillId: number) => {
    try {
        let response: any = await apiGet(API_SKILLS + "/" + SkillId);
        return response.data.data;
    } catch (error) {
        catchBlockHandler(error);
    }
};


export const createSkill = async (data: Skill) => {
    try {
        let response: any = await apiPost(API_SKILLS, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const updateSkill = async (SkillId: number, data: Skill) => {
    try {
        let response: any = await apiPut(API_SKILLS + "/" + SkillId, data);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

export const deleteSkill = async (SkillId: number) => {
    try {
        let response: any = await apiDelete(API_SKILLS + "/" + SkillId);
        return response.data._response_status.success;
    } catch (error) {
        catchBlockHandler(error);
    }
};

