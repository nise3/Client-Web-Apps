import {AuthType} from '../../../shared/constants/AppEnums';
import {Gender} from '../../../@softbd/utilities/Genders';
import {MaritalStatusType} from '../../../@softbd/utilities/MaritalStatus';
import {FreedomFighterStatusType} from '../../../@softbd/utilities/FreedomFighterStatus';
import {Religion} from '../../../@softbd/utilities/Religions';
import {IdentityNumberType} from '../../../@softbd/utilities/IdentityNumberTypes';
import {EthnicGroupStatusType} from '../../../@softbd/utilities/EthnicGroupStatus';
import {IOrganization} from '../../../shared/Interface/organization.interface';
import {IInstitute} from '../../../shared/Interface/institute.interface';
import {IRole} from '../../../shared/Interface/userManagement.interface';

export interface AuthUser {
  uid: string;
  userType: 'system' | 'institute' | 'organization' | 'youth';
  displayName?: string;
  email?: string;
  username: string;
  authType: AuthType;
  photoURL?: string;
  isYouthUser: boolean;
  isSystemUser: boolean;
  isInstituteUser: boolean;
  isTrainingCenterUser: boolean;
  isOrganizationUser: boolean;
  isIndustryAssociationUser: boolean;
  isRegisteredTrainingOrganizationUser: boolean;
}

export interface CommonAuthUser extends AuthUser {
  userId: string | number;
  institute_id?: string | number;
  organization_id?: string | number;
  institute?: IInstitute | any;
  organization?: IOrganization | any;
  role: IRole | any;
  permissions: string[];
  mobile?: string;
  institute_user_type?: string;
  training_center_id?: number;
  branch_id?: number;
  profile_pic?: string;
  name?: string;
  industry_association_id?: string | number | undefined;
  industry_association?: any;
  registered_training_organization_id?: string | number | undefined;
  registered_training_organization?: any;
  domain?: string;
}

export interface YouthAuthUser extends AuthUser {
  youthId: string | number;
  youthCode?: string;
  first_name: string;
  first_name_en?: string;
  last_name: string;
  last_name_en?: string;
  gender: Gender;
  mobile: string;
  user_name_type: number;
  admin_access_type?: any;
  youth_auth_source?: number;
  date_of_birth: string;
  physical_disability_status: number;
  marital_status: MaritalStatusType;
  freedom_fighter_status: FreedomFighterStatusType;
  religion: Religion;
  nationality?: string | number;
  identity_number_type: IdentityNumberType;
  identity_number?: string;
  does_belong_to_ethnic_group?: EthnicGroupStatusType;
  is_freelance_profile: number;
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
  addresses?: any[];
  total_certificates?: number;
  portfolios?: any[];
  profile_completed?: any;
  total_job_experience?: any;
  signature_image_path?: string;
  expected_salary?: any;
  job_level?: any;
  default_cv_template?: any;
}

// @ts-ignore
export interface AllAuthUser extends CommonAuthUser, YouthAuthUser {}
