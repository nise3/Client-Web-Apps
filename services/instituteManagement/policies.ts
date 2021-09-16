import {AuthUser} from '../../types/models/AuthUser';
import {checkPermission} from '../../@crema/utility/authorizations';

export const readInstitute = function (authUser: AuthUser | null) {
  return checkPermission(authUser, ['view_single_institute']);
};

export const readDivision = function (authUser: AuthUser | null) {
  return checkPermission(authUser, ['view_single_division']);
};
