import {AuthType} from '../../../shared/constants/AppEnums';
import {Gender} from '../../../@softbd/utilities/Genders';

export interface AuthUser {
  uid: string;
  userType: 'system' | 'institute' | 'organization' | 'youth';
  displayName?: string;
  email?: string;
  username: string;
  authType: AuthType;
}

export interface CommonAuthUser extends AuthUser {
  isSystemUser: boolean;
  isInstituteUser: boolean;
  isOrganizationUser: boolean;
  institute_id?: string | number;
  organization_id?: string | number;
  institute?: Institute | any;
  organization?: Organization | any;
  role: Role | any;
  permissions: string[];
  photoURL?: string;
}

export interface YouthAuthUser extends AuthUser {
  isYouthUser: boolean;
  first_name: string;
  first_name_en?: string;
  last_name: string;
  last_name_en?: string;
  gender: Gender;
  mobile: string;
  date_of_birth: string;
  physical_disability_status?: boolean;
  loc_division_id?: string;
  loc_division_title_en?: string;
  loc_division_title?: string;
  loc_district_id?: string;
  loc_district_title_en?: string;
  loc_district_title?: string;
  loc_upazila_id?: string;
  loc_upazila_title_en?: string;
  loc_upazila_title?: string;
  village_or_area?: string;
  village_or_area_en?: string;
  house_n_road?: string;
  house_n_road_en?: string;
  zip_or_postal_code?: string;
  bio?: string;
  bio_en?: string;
  photo?: string;
  cv_path?: string;
  physical_disabilities?: any[];
  languages_proficiencies?: any[];
  skills?: any[];
  educations?: any[];
  job_experiences?: any[];
  certifications?: any[];
  portfolios?: any[];
}

export interface AllAuthUser extends CommonAuthUser, YouthAuthUser {}
