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
  phone_numbers: string;
  primary_mobile: string;
  mobile_numbers: string;
  email: string;
  config: string;
  row_status: number;
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
  code: number;
  institute_id: number;
  institute_title_en: string;
  title_en: string;
  title_bn: string;
  course_fee: number;
  duration?: number;
  description?: string;
  target_group?: string;
  objectives?: string;
  contents?: string;
  training_methodology?: string;
  evaluation_system?: string;
  prerequisite?: string;
  eligibility?: string;
  cover_image?: string;
  row_status: number;
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
  branch_id: number;
  address: string;
  google_map_src: string;
  row_status: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
};
