import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';
import {CORE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_PERMISSION_SUB_GROUPS = CORE_SERVICE_PATH + '/permission-sub-groups';

export const getAllPermissionSubGroups = async () => {
  try {
    let response: any = await apiGet(API_PERMISSION_SUB_GROUPS);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getPermissionSubGroup = async (permissionSubGroupId: number) => {
  try {
    let response: any = await apiGet(
      API_PERMISSION_SUB_GROUPS + '/' + permissionSubGroupId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createPermissionSubGroup = async (data: PermissionSubGroup) => {
  try {
    let response: any = await apiPost(API_PERMISSION_SUB_GROUPS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updatePermissionSubGroup = async (
  permissionSubGroupId: number,
  data: PermissionSubGroup,
) => {
  try {
    let response: any = await apiPut(
      API_PERMISSION_SUB_GROUPS + '/' + permissionSubGroupId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deletePermissionSubGroup = async (
  permissionSubGroupId: number,
) => {
  try {
    let response: any = await apiDelete(
      API_PERMISSION_SUB_GROUPS + '/' + permissionSubGroupId,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
