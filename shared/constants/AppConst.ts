import {CommonAuthUser} from '../../redux/types/models/CommonAuthUser';
import {AuthType} from './AppEnums';

/**
 * @deprecated
 */
export const authRole = {
  admin: ['admin'],
  user: ['user', 'admin'],
};

/**
 * @deprecated
 */
export const defaultUser: CommonAuthUser = {
  isYouthUser: false,
  isInstituteUser: true,
  isOrganizationUser: false,
  isSystemUser: false,
  userType: 'institute',
  institute_id: 1,
  institute: {
    id: 1,
    title_en: 'Institutes 1',
    title_bn: 'Institutes 1 BN',
  },
  uid: 'RFedvhji876rfhjuecvh7',
  displayName: 'John Alex',
  username: '',
  permissions: [],
  email: 'demo@example.com',
  // token: 'access-token',
  role: authRole.user,
  authType: AuthType.AUTH0,
  photoURL: 'https://via.placeholder.com/150',
};
export const initialUrl = '/'; // this url will open after login.
export const COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA = 'auth_access_token_data';
export const COOKIE_KEY_APP_ACCESS_TOKEN = 'app_access_token';
export const COOKIE_KEY_APP_REFRESH_TOKEN = 'app_access_token';
