import {AuthType} from '../../shared/constants/AppEnums';

export interface AuthUser {
  uid: string;
  userType: 'system' | 'institute' | 'organization';
  isSystemUser: boolean;
  isInstituteUser: boolean;
  isOrganizationUser: boolean;
  institute_id?: string | number;
  organization_id?: string | number;
  institute?: {
    id: string | number;
    title_en: string;
    title_bn: string;
  };
  organization?: {
    id: string | number;
    title_en: string;
    title_bn: string;
  };
  role: string[];
  displayName?: string;
  email?: string;
  username: string;
  permissions: string[];
  photoURL?: string;
  authType: AuthType;
}
