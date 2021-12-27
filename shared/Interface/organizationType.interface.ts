import {IidTitleCreateUpdateAt, IRowStatus} from './common.interface';

export interface IOrganizationType extends IidTitleCreateUpdateAt, IRowStatus {
  is_government?: number;
  //row_status: number | string;
}
