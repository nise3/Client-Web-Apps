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
