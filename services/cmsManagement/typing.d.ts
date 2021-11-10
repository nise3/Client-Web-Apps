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
