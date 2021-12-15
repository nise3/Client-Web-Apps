export interface IPublication {
  id: number;
  title: string;
  title_en?: string;
  author: string;
  author_en?: string;
  description: string;
  description_en?: string;
  industry_association_id?: string | number;
  image_path: string;
  row_status: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
