import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_TEAM_MEMBERS} from '../../@softbd/common/apiRoutes';
import {IProject} from '../../shared/Interface/4IR.interface';

export const getAllImplementingTeams = async (params = {}) => {
  try {
    let response: any = await apiGet(API_4IR_TEAM_MEMBERS, {params});
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
      API_4IR_TEAM_MEMBERS + '/' + impelementingTeamId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createImplementingTeam = async (data: IProject) => {
  try {
    let response: any = await apiPost(API_4IR_TEAM_MEMBERS, data);
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
      API_4IR_TEAM_MEMBERS + '/' + impelementingTeamId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteTeamMember = async (implementingTeamId: number) => {
  try {
    let response: any = await apiDelete(
      API_4IR_TEAM_MEMBERS + '/' + implementingTeamId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
