import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IPublication extends IIdTitleCreateUpdateAt {
  author: string;
  author_en?: string;
  description: string;
  description_en?: string;
  industry_association_id: string | number;
  image_path?: string;
  row_status?: string;
  deleted_at?: string;
}
