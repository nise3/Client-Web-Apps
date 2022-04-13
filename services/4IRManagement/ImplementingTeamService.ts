import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_IMPLEMENTNG_TEAM} from '../../@softbd/common/apiRoutes';
import {IProject} from '../../shared/Interface/4IR.interface';

export const getAllImplementingTeams = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_IMPLEMENTNG_TEAM, {params});
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecatedimpelementingTeamId
 */
export const getImplementingTeam = async (impelementingTeamId: number) => {
  try {
    let response: any = await apiGet(
      API_4IR_IMPLEMENTNG_TEAM + '/' + impelementingTeamId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createImplementingTeam = async (data: IProject) => {
  try {
    let response: any = await apiPost(API_4IR_IMPLEMENTNG_TEAM, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateImplementingTeam = async (
  impelementingTeamId: number,
  data: IProject,
) => {
  try {
    let response: any = await apiPut(
      API_4IR_IMPLEMENTNG_TEAM + '/' + impelementingTeamId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteImplementingTeam = async (impelementingTeamId: number) => {
  try {
    let response: any = await apiDelete(
      API_4IR_IMPLEMENTNG_TEAM + '/' + impelementingTeamId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
