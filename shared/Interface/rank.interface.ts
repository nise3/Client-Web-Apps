import {IidTitleCreateUpdateAt, IRowStatus} from './common.interface';

export interface IRank extends IidTitleCreateUpdateAt, IRowStatus {
  key: string | number;
  organization_id?: number | string;
  organization_title_en: string;
  rank_type_id: string;
  rank_type_title_en: string;
  grade?: string;
  display_order?: string;
  //row_status?: number | string;
}
