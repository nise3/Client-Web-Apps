import {apiDelete, apiGet, apiPost, apiPut} from '../../@softbd/common/api';
import {catchBlockHandler} from '../../@softbd/common/helpers';
import {CORE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_PERMISSIONS = CORE_SERVICE_PATH + '/permissions';

export const getAllPermissions = async () => {
  try {
    let response: any = await apiGet(API_PERMISSIONS);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const getPermission = async (permissionId: number) => {
  try {
    let response: any = await apiGet(API_PERMISSIONS + '/' + permissionId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const deletePermission = async (permissionId: number) => {
  try {
    let response: any = await apiDelete(API_PERMISSIONS + '/' + permissionId);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const createPermission = async (data: Permission) => {
  try {
    let response: any = await apiPost(API_PERMISSIONS, data);
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};

export const updatePermission = async (
  permissionId: number,
  data: Permission,
) => {
  try {
    let response: any = await apiPut(
      API_PERMISSIONS + '/' + permissionId,
      data,
    );
    return response.data;
  } catch (error) {
    catchBlockHandler(error);
  }
};
