import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {API_ROLES} from '../../@softbd/common/apiRoutes';

/**
 * @deprecated
 */
export const getAllRoles = async () => {
  try {
    let response: any = await apiGet(API_ROLES);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

/**
 * @deprecated
 * @param roleId
 */
export const getRole = async (roleId: number) => {
  try {
    let response: any = await apiGet(API_ROLES + '/' + roleId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deleteRole = async (roleId: number) => {
  try {
    let response: any = await apiDelete(API_ROLES + '/' + roleId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createRole = async (data: Role) => {
  try {
    let response: any = await apiPost(API_ROLES, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updateRole = async (roleId: number, data: Role) => {
  try {
    let response: any = await apiPut(API_ROLES + '/' + roleId, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const assignPermissions = async (
  roleId: number,
  permissions: number[],
) => {
  try {
    let response: any = await apiPost(
      `${API_ROLES}/${roleId}/assign-permissions`,
      {permissions: permissions},
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
