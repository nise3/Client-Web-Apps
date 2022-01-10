import {IIdTitleCreateUpdateAt, IIdTitles} from './common.interface';

export interface IJobSectorDto extends IIdTitleCreateUpdateAt {
  row_status?: number | string;
}
export interface IJobSector extends IJobSectorDto, IIdTitles {}
