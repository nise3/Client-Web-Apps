import {CommonAuthUser} from '../../redux/types/models/CommonAuthUser';
import {checkPermission} from '../../@crema/utility/authorizations';

export const readInstitute = function (authUser: CommonAuthUser | null) {
  return checkPermission(authUser, ['view_single_institute']);
};

export const readDivision = function (authUser: CommonAuthUser | null) {
  return checkPermission(authUser, ['view_single_division']);
};
