import {IidTitleCreateUpdateAt, IidTitles} from './common.interface';

export interface IJobSectorDto extends IidTitleCreateUpdateAt{
    row_status?: number | string;
  }
  export interface IJobSector extends IJobSectorDto,IidTitles{
  }