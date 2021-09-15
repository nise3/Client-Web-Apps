import {AuthUser} from '../../types/models/AuthUser';
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
export const defaultUser: AuthUser = {
  uid: 'RFedvhji876rfhjuecvh7',
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: authRole.user,
  authType: AuthType.AUTH0,
  photoURL: 'https://via.placeholder.com/150',
};
export const initialUrl = '/'; // this url will open after login.
export const COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA = 'auth_access_token_data';
