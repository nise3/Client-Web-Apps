import {AuthType} from '../../shared/constants/AppEnums';

export interface AuthUser {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  authType: AuthType;
  role: string[];
  username: string;
  permissions: string[];
}
