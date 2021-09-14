import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_PERMISSIONS, API_ROLES} from '../../@softbd/common/apiRoutes';

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
