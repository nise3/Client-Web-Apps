type FAQ = {
  show_in: number;
  institute_id?: number;
  organization_id?: number;
  industry_association_id?: number;
  question: string;
  answer: string;
  row_status: number;
  other_language_fields?: object;
};

type Partner = {
  id: number;
  title: string;
  // title_en: string;
  main_image_path?: string;
  thumb_image_path?: string;
  grid_image_path?: string;
  domain?: string;
  image_alt_title?: string;
  row_status: string;
  other_language_fields?: object;
};

interface Calendar {
  title: string;
  youth_id?: number | string;
  institute_id?: number | string;
  organization_id?: number | string;
  batch_id?: number | string;
  industry_association_id?: number | string;
  start_date: string;
  start?: string;
  end_date: string;
  end?: string;
  start_time?: string;
  end_time?: string;
  color?: string;
  updated_at?: string;
  created_at?: string;
  id?: number | string;
};

interface StaticPage {
  title?: string;
  sub_title?: string;
  show_in?: number | string;
  content_slug_or_id?: string;
  institute_id?: string | number;
  organization_id?: string | number;
  content_type?: string;
  contents?: string;
  row_status?: number | string;
  updated_at?: string;
  crated_at?: string;
}
