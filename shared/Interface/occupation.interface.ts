import {
  ICreateUpdateBy,
  IidTitleCreateUpdateAt,
  IRowStatus,
} from './common.interface';

export interface IOccupation
  extends IidTitleCreateUpdateAt,
    IRowStatus,
    ICreateUpdateBy {
  job_sector_id: number;
  job_sector_title?: string;
  job_sector_title_en?: string;
  //row_status: number | string;
}
