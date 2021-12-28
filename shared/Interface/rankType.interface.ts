import {IidTitles, IRowStatus} from './common.interface';

export interface IRankType extends IidTitles, IRowStatus {
  key: number;
  organization_id?: number | string | undefined;
  description?: string;
  description_en?: string;
  //row_status?: number | string;
}
