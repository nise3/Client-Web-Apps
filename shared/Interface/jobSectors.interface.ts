import {
  IidTitleCreateUpdateAt,
  IidTitles,
  IRowStatus,
} from './common.interface';

export interface IJobSectorDto extends IidTitleCreateUpdateAt, IRowStatus {
  //row_status?: number | string;
}
export interface IJobSector extends IJobSectorDto, IidTitles {}
