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
  end_date: string;
  start_time?: string;
  end_time?: string;
  color?: string;
  updated_at?: string;
  created_at?: string;
  id?: number | string;
};