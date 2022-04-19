import {IInstitute} from './institute.interface';
import {IOrganization} from './organization.interface';
import {IRole} from './userManagement.interface';
import {Gender} from '../../@softbd/utilities/Genders';
import {FreedomFighterStatusType} from '../../@softbd/utilities/FreedomFighterStatus';
import {IdentityNumberType} from '../../@softbd/utilities/IdentityNumberTypes';
import {MaritalStatusType} from '../../@softbd/utilities/MaritalStatus';
import {Religion} from '../../@softbd/utilities/Religions';
import {EthnicGroupStatusType} from '../../@softbd/utilities/EthnicGroupStatus';

export interface TOnSSOSignInCallback {
  access_token: string; // Inorder to consume api, use access token to authorize.
  expires_in: string | number; // token lifetime in second
  id_token: string; // {Header, payload, signature}
  session_state: string; // I don't know.
  refresh_token: string;
}

export interface TAuthUserSSOResponse {
  sub: string;
  upn: string;
  user_id: string | number;
  given_name: string;
  family_name: string;
  userType: 'system' | 'institute' | 'organization' | 'youth';
  isSystemUser: boolean;
  isInstituteUser: boolean;
  isOrganizationUser: boolean;
  isIndustryAssociationUser: boolean;
  isRegisteredTrainingOrganizationUser: boolean;
  institute_id?: string | number;
  organization_id?: string | number;
  institute?: IInstitute;
  organization?: IOrganization;
  role?: IRole;
  displayName?: string;
  email?: string;
  username: string;
  permissions: string[];
  profile_pic?: string;
  name?: string;
  institute_user_type?: string;
  training_center_id?: number;
  branch_id?: number;
  industry_association_id?: number;
  industry_association?: any;
  registered_training_organization_id?: number;
  registered_training_organization?: any;
  domain?: string;
}

export interface TYouthAuthUserSSOResponse {
  id: number | string;
  sub: string;
  upn: string;
  given_name: string;
  family_name: string;
  userType: 'youth';
  displayName?: string;
  code?: string;
  email?: string;
  username: string;
  permissions: string[];
  photoURL?: string;
  date_of_birth: string;
  first_name: string;
  gender: Gender;
  last_name: string;
  last_name_en?: string;
  mobile: string;
  user_name_type: number;
  admin_access_type?: any;
  youth_auth_source?: number;
  freedom_fighter_status: FreedomFighterStatusType;
  identity_number_type: IdentityNumberType;
  identity_number?: string;
  marital_status: MaritalStatusType;
  religion: Religion;
  nationality?: string;
  does_belong_to_ethnic_group: EthnicGroupStatusType;
  is_freelance_profile: number;
  first_name_en?: string;
  physical_disability_status: number;
  loc_division_id?: string;
  division_title_en?: string;
  division_title?: string;
  loc_district_id?: string;
  district_title_en?: string;
  district_title?: string;
  loc_upazila_id?: string;
  upazila_title_en?: string;
  upazila_title?: string;
  village_or_area?: string;
  village_or_area_en?: string;
  house_n_road?: string;
  house_n_road_en?: string;
  zip_or_postal_code?: string;
  bio?: string;
  bio_en?: string;
  photo?: string;
  cv_path?: string;
  signature_image_path?: string;
  physical_disabilities?: any[];
  skills?: any[];
  youth_certifications?: any[];
  youth_educations?: any[];
  youth_languages_proficiencies?: any[];
  youth_portfolios?: any[];
  youth_addresses?: any[];
  profile_completed?: any;
  total_job_experience?: any;
  expected_salary?: any;
  job_level?: any;
  default_cv_template?: any;
}
