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
