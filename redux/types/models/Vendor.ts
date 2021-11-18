export interface CurrentInstitute {
  id: number;
  title_en: string;
  title: string;
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
}
