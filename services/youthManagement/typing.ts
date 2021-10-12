import {Gender} from '../../@softbd/utilities/Genders';

export interface YouthJobExperience {
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
  job_description?: string;
  job_description_en?: string;
  is_currently_work?: number;
}

export interface YouthPersonalInfo {
  first_name: string;
  first_name_en?: string;
  last_name: string;
  last_name_en?: string;
  gender?: Gender;
  email: string;
  mobile: string;
  date_of_birth?: string;
  physical_disability_status?: string | number;
  physical_disabilities: Array<any>;
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
}

export interface YouthEducation {
  id: number;
  institute_name: string;
  institute_name_en?: string;
  examination_id: string | number;
  board_id?: string | number;
  edu_group_id?: string | number;
  major_or_subject_id?: string | number;
  roll_number: string;
  registration_number: string;
  result_type: string;
  division_type_result?: string;
  cgpa_gpa_max_value?: string;
  received_cgpa_gpa?: string;
  passing_year: string;
}

export interface YouthReference {
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

export interface YouthCertificate {
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
