import {AuthType} from '../../shared/constants/AppEnums';

export interface AuthUser {
  uid: string;
  userType: 'system' | 'institute' | 'organization';
  isSystemUser: boolean;
  isInstituteUser: boolean;
  isOrganizationUser: boolean;
  institute_id?: string | number;
  organization_id?: string | number;
  institute?: Institute;
  organization?: Organization;
  role: Role;
  displayName?: string;
  email?: string;
  username: string;
  permissions: string[];
  photoURL?: string;
  authType: AuthType;
}
