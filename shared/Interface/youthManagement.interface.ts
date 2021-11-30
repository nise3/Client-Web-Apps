import {Gender} from '../../@softbd/utilities/Genders';
import {FreedomFighterStatusType} from '../../@softbd/utilities/FreedomFighterStatus';
import {IdentityNumberType} from '../../@softbd/utilities/IdentityNumberTypes';
import {MaritalStatusType} from '../../@softbd/utilities/MaritalStatus';
import {Religion} from '../../@softbd/utilities/Religions';
import {EthnicGroupStatusType} from '../../@softbd/utilities/EthnicGroupStatus';

export interface IYouthJobExperience {
  id: number;
  youth_id?: number;
  company_name: string;
  company_name_en?: string;
  employment_type_id: number | string;
  position: string;
  position_en?: string;
  start_date: string;
  end_date?: string;
  location: string;
  location_en?: string;
  job_responsibilities?: string;
  job_responsibilities_en?: string;
  is_currently_working?: number;
}

export interface IYouthPersonalInfo {
  first_name: string;
  first_name_en?: string;
  last_name: string;
  last_name_en?: string;
  gender?: Gender;
  email: string;
  mobile: string;
  skills?: Array<any>;
  date_of_birth?: string;
  physical_disability_status?: string | number;
  physical_disabilities?: Array<any>;
  user_name_type?: number;
  freedom_fighter_status: FreedomFighterStatusType;
  identity_number_type: IdentityNumberType;
  marital_status: MaritalStatusType;
  religion: Religion;
  nationality?: string;
  does_belong_to_ethnic_group: EthnicGroupStatusType;
  loc_division_id: string | number;
  loc_district_id: string | number;
  loc_upazila_id?: string | number;
  village_or_area?: string;
  village_or_area_en?: string;
  house_n_road?: string;
  house_n_road_en?: string;
  zip_or_postal_code: string;
  is_freelance_profile?: number;
  bio?: string;
  bio_en?: string;
  photo?: string;
  cv_path?: string;
  nid?: string;
  bid?: string;
}

export interface IYouthEducation {
  id: number;
  education_level_id: string | number;
  education_level_title?: string;
  education_level_title_en?: string;
  exam_degree_id?: string | number;
  exam_degree_title?: string;
  exam_degree_title_en?: string;
  exam_degree_name?: string;
  exam_degree_name_en?: string;
  major_or_concentration?: string;
  major_or_concentration_en?: string;
  edu_board_id?: string | number;
  board_title?: string;
  board_title_en?: string;
  edu_group_id?: string | number;
  edu_group_title?: string;
  edu_group_title_en?: string;
  institute_name: string;
  institute_name_en?: string;
  is_foreign_institute: number;
  foreign_institute_country_id?: string | number;
  result: {
    id: number;
    code: string;
    title: string;
    title_en: string;
  };
  marks_in_percentage?: string | number;
  cgpa_scale?: string | number;
  cgpa?: string | number;
  year_of_passing?: string | number;
  expected_year_of_passing?: string | number;
  duration?: string | number;
  achievements?: string;
  achievements_en?: string;
}

export interface IYouthReference{
  id: number;
  youth_id?: number;
  referrer_first_name_en?: string;
  referrer_first_name: string;
  referrer_last_name_en?: string;
  referrer_last_name: string;
  referrer_organization_name_en?: string;
  referrer_organization_name: string;
  referrer_designation_en?: string;
  referrer_designation: string;
  referrer_address_en?: string;
  referrer_address: string;
  referrer_email: string;
  referrer_mobile: string;
  referrer_relation_en?: string;
  referrer_relation: string;
}

export interface IYouthCertificate{
  id: number;
  youth_id?: number;
  certification_name: string;
  certification_name_en?: string;
  company_name_en?: string;
  institute_name: string;
  institute_name_en?: string;
  location: string;
  location_en?: string;
  start_date?: string;
  end_date?: string;
  certificate_file_path: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface IYouthLanguageProficiency {
  id: number;
  youth_id?: number;
  language_id: number | string;
  language_title?: string;
  language_title_en?: string;
  lang_code?: string;
  reading_proficiency_level: number | string;
  writing_proficiency_level: number | string;
  speaking_proficiency_level: number | string;
  understand_proficiency_level: number | string;
}

export interface IYouthPortfolio {
  id: number;
  youth_id?: number;
  title: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  file_path?: string;
}

export interface IGuardian {
  id: number;
  youth_id: string;
  name: string;
  name_en?: string;
  nid?: string;
  mobile?: string;
  date_of_birth?: string;
  relationship_type: any;
  relationship_title?: string;
  relationship_title_en?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
