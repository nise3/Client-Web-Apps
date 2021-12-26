import { IidTitleCreateUpdateAt } from "./common.interface";

export interface IOccupation extends IidTitleCreateUpdateAt{
    job_sector_id: number | string;
    row_status: number | string;
  }