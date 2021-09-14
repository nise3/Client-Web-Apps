import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_PERMISSION_GROUPS,
  API_PERMISSION_SUB_GROUPS,
  API_PERMISSIONS,
  API_ROLES,
} from '../../@softbd/common/apiRoutes';

export function useFetchRoles(params: any) {
  return useAxiosSWR([API_ROLES, params]);
}

export function useFetchRole(roleId: number | null) {
  return useAxiosSWR(roleId ? API_ROLES + '/' + roleId : null);
}

export function useFetchPermissions(params: any) {
  return useAxiosSWR([API_PERMISSIONS, params]);
}

export function useFetchPermission(permissionId: number | null) {
  return useAxiosSWR(
    permissionId ? API_PERMISSIONS + '/' + permissionId : null,
  );
}

export function useFetchPermissionGroups(params: any) {
  return useAxiosSWR([API_PERMISSION_GROUPS, params]);
}

export function useFetchPermissionGroup(permissionGroupId: number | null) {
  return useAxiosSWR(
    permissionGroupId ? API_PERMISSION_GROUPS + '/' + permissionGroupId : null,
  );
}

export function useFetchPermissionSubGroup(
  permissionSubGroupId: number | null,
) {
  return useAxiosSWR(
    permissionSubGroupId
      ? API_PERMISSION_SUB_GROUPS + '/' + permissionSubGroupId
      : null,
  );
}

export function useFetchPermissionSubGroups(params: any) {
  return useAxiosSWR([API_PERMISSION_SUB_GROUPS, params]);
}
