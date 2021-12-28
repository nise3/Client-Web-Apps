import {IidTitleCreateUpdateAt, IRowStatus} from './common.interface';

export interface IOrganizationUnitType
  extends IidTitleCreateUpdateAt,
    IRowStatus {
  organization_id: number;
  //row_status?: number | string;
}
