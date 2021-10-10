import {CommonAuthUser} from '../../types/models/CommonAuthUser';

export const checkPermission = (
  authUser: CommonAuthUser | null,
  permissionKeys: any[],
): boolean => {
  if (authUser === null || authUser === undefined) {
    return false;
  }
  return (authUser.permissions || []).some((v) => permissionKeys.includes(v));
};
