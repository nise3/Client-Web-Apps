import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IOccupation extends IIdTitleCreateUpdateAt {
  job_sector_id: number | string;
  job_sector_title?: string;
  job_sector_title_en?: string;
  row_status?: number | string;
}
