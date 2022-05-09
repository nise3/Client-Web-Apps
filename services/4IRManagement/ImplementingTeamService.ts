import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_4IR_TEAM_MEMBERS} from '../../@softbd/common/apiRoutes';

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

export const createTeamMember = async (data: any) => {
  try {
    let response: any = await apiPost(API_4IR_TEAM_MEMBERS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateTeamMember = async (teamMemberId: number, data: any) => {
  try {
    let response: any = await apiPut(
      API_4IR_TEAM_MEMBERS + '/' + teamMemberId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteTeamMember = async (TeamMemberId: number) => {
  try {
    let response: any = await apiDelete(
      API_4IR_TEAM_MEMBERS + '/' + TeamMemberId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
