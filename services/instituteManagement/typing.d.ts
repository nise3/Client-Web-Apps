type Institute = {
  id: number;
  title_en: string;
  title_bn: string;
  code: string;
  domain: string;
  address: string;
  google_map_src: string;
  logo: string;
  primary_phone: string;
  phone_numbers: Array<object>;
  primary_mobile: string;
  mobile_numbers: Array<object>;
  email: string;
  config: string;
  row_status: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

type Programme = {
  id: number;
  title_en: string;
  title_bn: string;
  institute_id: string | number;
  institute_title_en?: string;
  code: string;
  logo: string;
  description?: string;
  row_status: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

type Course = {
  id: string;
  code: string;
  institute_id: number | string;
  institute_title_en: string;
  title_en: string;
  title_bn: string;
  course_fee: string;
  duration?: string;
  description?: string;
  target_group?: string;
  objectives?: string;
  contents?: string;
  training_methodology?: string;
  evaluation_system?: string;
  prerequisite?: string;
  eligibility?: string;
  cover_image?: string;
  row_status: string;
  crated_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

type Branch = {
  id: number;
  title_en: string;
  title_bn: string;
  institute_id: number | string;
  institute_title_en?: string;
  address?: string;
  google_map_src?: string;
  row_status: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

type TrainingCenter = {
  id: number;
  title_en: string;
  title_bn: string;
  institute_id: number | string;
  branch_id?: number | string;
  address: string;
  google_map_src: string;
  row_status: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};
type Trainer = {
  id: number;
  trainer_name_en: string;
  trainer_name_bn: string;
  institute_id: number | string;
  branch_id: number | string;
  training_center_id: number | string;
  trainer_registration_number: number | string;
  email: string;
  mobile: string;
  date_of_birth: string;
  about_me: string;
  gender: number | string;
  marital_status: number | string;
  religion: number | string;
  nationality: string;
  nid: string;
  passport_number: string;
  present_address_division_id: number | string;
  present_address_district_id: number | string;
  present_address_upazila_id: number | string;
  permanent_address_district_id: number | string;
  permanent_address_upazila_id: number | string;
  permanent_address_division_id: number | string;
  present_house_address: string;
  permanent_house_address: string;
  educational_qualification: string;
  skills: string;
  row_status: string;
  updated_at?: string;
  crated_at?: string;
};

type Batch = {
  id: number;
  institute_id: number | string;
  course_id: number | string;
  training_center_id: number | string;
  programme_id: number | string;
  branch_id: number | string;
  number_of_seats: number | string;
  available_seats: number | string;
  registration_start_date: string;
  registration_end_date: string;
  batch_start_date: string;
  batch_end_date: string;
  dynamic_form_field: string | object;
  row_status: string;
  trainers?: Array<number>;
  crated_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

type Application = {
  id: number;
  Gender: string;
  fullName: string;
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
  row_status: number;
  approval_status: string;
  accepted: number;
  rejected: number;
  created_at: string;
  updated_at: string;
}
