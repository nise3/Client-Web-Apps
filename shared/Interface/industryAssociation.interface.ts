import { IidTitles } from "./common.interface";

export interface IAssociationMember extends IidTitles {
  organization_type_id: number;
  title_en: string;
  loc_division_id: number;
  loc_district_id: number;
  loc_upazila_id: number;
  location_latitude: string;
  location_longitude: string;
  google_map_src: string;
  address: string;
  address_en: string;
  country: string;
  phone_code: string;
  mobile: string;
  email: string;
  fax_no: string;
  name_of_the_office_head: string;
  name_of_the_office_head_en: string;
  name_of_the_office_head_designation: string;
  name_of_the_office_head_designation_en: string;
  contact_person_name: string;
  contact_person_name_en: string;
  contact_person_mobile: string;
  contact_person_email: string;
  contact_person_designation: string;
  contact_person_designation_en: string;
  description: string;
  description_en: string;
  logo: string;
  domain: string;
  row_status: string;
  created_at: string;
  updated_at?: string;
}


