import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IOrganizationUnitType extends IIdTitleCreateUpdateAt {
  organization_id?: number;
  row_status?: number | string;
}
