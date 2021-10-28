type RankType = {
  key: number;
  id: number;
  organization_id?: number | string | undefined;
  title_en: string;
  title: string;
  description?: string;
  description_en?: string;
  row_status?: number | string;
};

type Rank = {
  key: string | number;
  id: number;
  title_en?: string;
  title?: string;
  organization_id?: number | string;
  organization_title_en: string;
  rank_type_id: string;
  rank_type_title_en: string;
  grade?: string;
  display_order?: string;
  row_status?: number | string;
  created_at?: string;
  updated_at?: string;
};

type OrganizationType = {
  id: number;
  title_en?: string;
  title: string;
  is_government: number;
  row_status: number | string;
  created_at?: string;
  updated_at?: string;
};

type Organization = {
  id: number;
  title_en?: string;
  title: string;
  permission_sub_group: number | string;
  contact_person_designation: string;
  contact_person_designation_en?: string;
  contact_person_email: string;
  contact_person_mobile: string;
  contact_person_name: string;
  contact_person_name_en?: string;
  name_of_the_office_head?: string;
  name_of_the_office_head_en?: string;
  name_of_the_office_head_designation?: string;
  name_of_the_office_head_designation_en?: string;
  description?: string;
  description_en?: string;
  domain?: string;
  email?: string;
  fax_no?: string;
  loc_district_id?: number | string;
  loc_division_id?: number | string;
  loc_upazila_id?: number | string;
  location_latitude?: number | string;
  location_longitude?: number | string;
  google_map_src?: number | string;
  logo?: string;
  address?: string;
  address_en?: string;
  country?: string;
  phone_code?: string | number;
  mobile?: string;
  organization_types_title?: string;
  organization_type_id: number | string;
  row_status?: number | string;
  created_at?: string;
  updated_at?: string;
};

type Service = {
  key: number;
  id: number;
  title_en: string;
  title: string;
  row_status: number | string;
  updated_at?: string;
  crated_at?: string;
};

type JobSector = {
  id: number;
  title_en?: string;
  title: string;
  row_status?: number | string;
  updated_at?: string;
  crated_at?: string;
};

type Occupation = {
  id: number;
  title_en: string;
  title: string;
  job_sector_id: number | string;
  row_status: number | string;
  updated_at?: string;
  crated_at?: string;
};

type OrganizationUnit = {
  id: number;
  title_en: string;
  title: string;
  organization_id: number;
  organization_unit_type_id: number;
  loc_division_id: number;
  loc_district_id: number;
  loc_upazila_id: number;
  employee_size: number;
  address: string;
  mobile: string;
  email: string;
  fax_no: string;
  contact_person_designation: string;
  contact_person_email: string;
  contact_person_mobile: string;
  contact_person_name: string;
  services?: Array<number>;
  row_status: number | string;
  updated_at?: string;
  crated_at?: string;
};

type OrganizationUnitType = {
  id: number;
  title_en?: string;
  title: string;
  organization_id: number;
  row_status?: number | string;
  updated_at?: string;
  crated_at?: string;
};

type Skill = {
  id: number;
  title_en: string;
  title: string;
  description: string;
  row_status?: number | string;
  updated_at?: string;
  crated_at?: string;
};

type HumanResourceTemplate = {
  id: number;
  title_en: string;
  title: string;
  organization_id: number | string;
  organization_title_en: string;
  organization_title: string;
  organization_unit_type_id: number | string;
  organization_unit_type_title_en: string;
  organization_unit_type_title: string;
  rank_id?: number | string;
  parent_id?: number | string | null;
  parent?: number | string | null;
  display_order?: number | string;
  is_designation?: number | string;
  status?: number;
  row_status?: string;
  updated_at?: string;
  crated_at?: string;
};

type HumanResource = {
  id: number;
  title_en: string;
  title: string;
  organization_id: number | string;
  organization_title_en: string;
  organization_title: string;
  organization_unit_id: number | string;
  organization_unit_title_en: string;
  organization_unit_title: string;
  display_order?: number | string;
  is_designation?: number | string;
  parent_id?: number | string | null;
  parent?: number | string | null;
  rank_id?: number | string;
  row_status?: string;
  updated_at?: string;
  crated_at?: string;
};

type BatchAssign = {
  batch_id?: number | string | null;
};
