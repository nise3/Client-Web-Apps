import {AuthUser} from '../../types/models/AuthUser';

export const checkPermission = (
  authUser: AuthUser | null,
  permissionKeys: any[],
): boolean => {
  if (authUser === null || authUser === undefined) {
    return false;
  }
  return (authUser.permissions || []).some(
    (v) => v && permissionKeys.includes(v),
  );
};
