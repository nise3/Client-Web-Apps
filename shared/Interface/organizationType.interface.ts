import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IOrganizationType extends IIdTitleCreateUpdateAt {
  is_government?: number;
  row_status?: number | string;
}
