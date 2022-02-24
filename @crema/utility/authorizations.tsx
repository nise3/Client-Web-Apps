import {CommonAuthUser} from '../../redux/types/models/CommonAuthUser';
import {routePermissions} from '../../@softbd/common/routePermissions';

export const checkPermission = (
  authUser: CommonAuthUser | null,
  permissionKeys: any[],
): boolean => {
  if (authUser === null || authUser === undefined) {
    return false;
  }
  return (authUser.permissions || []).some((v) => permissionKeys.includes(v));
};

export const checkHasPermission = (
  authUser: CommonAuthUser | null,
  permissionKeys: any[],
): boolean => {
  if (authUser === null || authUser === undefined) {
    return false;
  }

  let hasPermission = false;
  permissionKeys.map((key: any) => {
    if ((authUser.permissions || []).includes(key)) {
      hasPermission = true;
      return;
    }
  });

  return hasPermission;
};

const getPermissionKeysByPath = (path: string) => {
  let prev: string = '';

  let parts = path
    .replace(/^\/|\/$/g, '')
    .split('/')
    .map((part) => {
      prev += '/' + part;
      return prev;
    });

  let routePermission: any = undefined;

  parts.reverse().forEach((part) => {
    if (!routePermission) routePermission = routePermissions[part];
  });

  return routePermission?.permissionKeys ? routePermission.permissionKeys : [];
};

export const checkHasRoutePermission = (
  authUser: CommonAuthUser | null,
  path: string,
): boolean => {
  if (authUser === null || authUser === undefined) {
    return false;
  }

  if (path == '' || path == '/') return true;

  let permissionKeys = getPermissionKeysByPath(path);

  let hasPermission = false;
  permissionKeys.map((key: any) => {
    if ((authUser.permissions || []).includes(key)) {
      hasPermission = true;
      return;
    }
  });

  return hasPermission;
};
