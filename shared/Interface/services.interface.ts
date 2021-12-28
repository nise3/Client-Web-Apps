import {IidTitleCreateUpdateAt, IRowStatus} from './common.interface';

export interface IService extends IidTitleCreateUpdateAt, IRowStatus {
  key: number;
  //row_status: number | string;
}
