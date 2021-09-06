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
  institute_id: number;
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
  id: number;
  code: string;
  institute_id: number;
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
  institute_id: number;
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
  institute_id: number;
  branch_id?: number;
  address: string;
  google_map_src: string;
  row_status: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};

type Batch = {
  id: number;
  institute_id: number;
  course_id: number;
  training_center_id: number;
  programme_id: number;
  branch_id: number;
  number_of_seats: number;
  available_seats: number;
  registration_start_date: string;
  registration_end_date: string;
  batch_start_date: string;
  batch_end_date: string;
  dynamic_form_field: string;
  row_status: string;
  crated_by?: string;
  updated_by?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};
