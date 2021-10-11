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
  description?: string;
  description_en?: string;
  is_currently_work?: number;
}
