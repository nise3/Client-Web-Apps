export interface Division {
  id: number;
  title_en: string;
  title: string;
  bbs_code: string;
  row_status: string;
}

export interface District {
  id: number;
  title_en: string;
  title: string;
  bbs_code: string;
  loc_division_id: number;
  row_status: string;
}

export interface Upazila {
  id: number;
  title_en: string;
  title: string;
  bbs_code: string;
  loc_division_id: number;
  loc_district_id: number;
  row_status: string;
}
