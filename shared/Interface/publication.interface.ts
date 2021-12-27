import {
  IDeleteAt,
  IidTitleCreateUpdateAt,
  IRowStatus,
} from './common.interface';

export interface IPublication
  extends IidTitleCreateUpdateAt,
    IRowStatus,
    IDeleteAt {
  author: string;
  author_en?: string;
  description: string;
  description_en?: string;
  industry_association_id: number;
  image_path?: string;
  //row_status: string;
  //deleted_at?: string;
}
