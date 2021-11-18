export interface CurrentInstitute {
  id: number;
  title: string;
  code: string;
  domain: string;
  address: string;
  google_map_src?: string;
  logo?: string;
  primary_phone?: string;
  phone_numbers?: Array<object>;
  primary_mobile?: string;
  mobile_numbers?: Array<object>;
  email?: string;
  config?: string;
  row_status?: string;

  [x: string]: any;
}
