import {
  ICreateUpdateAt,
  IIdHolder,
  IIdTitleCreateUpdateAt,
} from './common.interface';

export interface IInstitute extends IIdTitleCreateUpdateAt {
  code: string;
  domain: string;
  address: string;
  service_type?: number | string;
  country_id?: number | string;
  google_map_src: string;
  logo: string;
  primary_phone: string;
  phone_numbers: Array<object>;
  rto_occupation_exceptions?: Array<any>;
  primary_mobile: string;
  mobile_numbers: Array<object>;
  email: string;
  config: string;
  row_status?: string;
  deleted_at?: string;
}
export interface ISubject extends IIdTitleCreateUpdateAt {
  title: string;
  title_en: string;
}

export interface IQuestionSet extends IIdTitleCreateUpdateAt {
  assessment_id: string | number;
  title: string;
  title_en: string;
  row_status?: string;
}

export interface IProgramme extends IIdTitleCreateUpdateAt {
  institute_id?: string | number;
  industry_association_id?: string | number;
  institute_title_en?: string;
  code?: string;
  logo?: string;
  description?: string;
  description_en?: string;
  row_status?: string;
  deleted_at?: string;
}

export interface ICourse extends IIdTitleCreateUpdateAt {
  code: string;
  institute_id?: number | string;
  industry_association_id?: number | string;
  institute_title?: string;
  institute_title_en?: string;
  branch_id?: number | string;
  branch_title?: string;
  branch_title_en?: string;
  program_id?: number | string;
  program_title?: string;
  program_title_en?: string;
  level: number | string;
  language_medium: number | string;
  skills: Array<number | string>;
  course_fee: string;
  duration?: string;
  target_group?: string;
  target_group_en?: string;
  overview?: string;
  overview_en?: string;
  objectives?: string;
  objectives_en?: string;
  training_methodology?: string;
  training_methodology_en?: string;
  evaluation_system?: string;
  evaluation_system_en?: string;
  prerequisite?: string;
  prerequisite_en?: string;
  eligibility?: string;
  eligibility_en?: string;
  cover_image?: string;
  row_status?: string;
  crated_by?: string;
  updated_by?: string;
  deleted_at?: string;
  dynamic_form_field: string | object;
  application_form_settings: string | object;
}

export interface IBranch extends IIdTitleCreateUpdateAt {
  institute_id?: number | string;
  institute_title_en?: string;
  address?: string;
  address_en?: string;
  loc_division_id: number | string;
  loc_district_id: number | string;
  loc_upazila_id: number | string;
  google_map_src?: string;
  row_status?: string;
  deleted_at?: string;
}

export interface ITrainingCenter extends IIdTitleCreateUpdateAt {
  institute_id?: number | string;
  industry_association_id?: number | string;
  branch_id?: number | string;
  loc_division_id?: number | string;
  loc_district_id?: number | string;
  loc_upazila_id?: number | string;
  location_latitude?: string;
  location_longitude?: string;
  address_en?: string;
  center_location_type?: number | string;
  address?: string;
  google_map_src?: string;
  row_status?: string;
  deleted_at?: string;
}

export interface ITrainer extends IIdHolder, ICreateUpdateAt {
  institute_id?: number | string;
  industry_association_id?: number | string;
  trainer_name_en?: string;
  trainer_name: string;
  branch_id?: number | string;
  role_id: number | string;
  training_center_id?: number | string;
  trainer_registration_number: number | string;
  email: string;
  mobile: string;
  date_of_birth: string;
  about_me?: string;
  about_me_en?: string;
  gender: number | string;
  marital_status: number | string;
  religion?: number | string;
  nationality: string;
  nid?: string;
  passport_number?: string;
  present_address_division_id?: number | string;
  present_address_district_id?: number | string;
  present_address_upazila_id?: number | string;
  permanent_address_district_id?: number | string;
  permanent_address_upazila_id?: number | string;
  permanent_address_division_id?: number | string;
  present_house_address?: string;
  present_house_address_en?: string;
  permanent_house_address?: string;
  permanent_house_address_en?: string;
  educational_qualification?: string;
  educational_qualification_en?: string;
  photo?: string;
  signature?: string;
  skills?: Array<any>;
  subject?: string;
  row_status?: string;
}

export interface IBatch extends IIdTitleCreateUpdateAt {
  institute_id?: number | string;
  industry_association_id?: number | string;
  course_id: number | string;
  training_center_id?: number | string;
  branch_id?: number | string;
  number_of_seats: number | string;
  available_seats: number | string;
  registration_start_date: string;
  registration_end_date: string;
  batch_start_date: string;
  batch_end_date: string;
  row_status?: string;
  trainers?: Array<number>;
  crated_by?: string;
  updated_by?: string;
  deleted_at?: string;
}

export interface IApplication extends IIdHolder, ICreateUpdateAt {
  Gender: string;
  full_name: string;
  course_name: string;
  username: string;
  user_name_type: number;
  first_name: string;
  last_name: string;
  gender: number;
  email: string;
  mobile: string;
  date_of_birth: string;
  physical_disability_status: number;
  loc_division_id: number;
  loc_district_id: number;
  row_status?: number;
  approval_status: string;
  accepted: number;
  rejected: number;
}

export interface IPermissionSubGroupAssignInstitute {
  permission_sub_group_id: number | string | null;
}
