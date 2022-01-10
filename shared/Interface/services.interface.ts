import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IService extends IIdTitleCreateUpdateAt {
  key: number;
  row_status?: number | string;
}
