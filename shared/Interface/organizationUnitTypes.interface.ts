import { IidTitleCreateUpdateAt } from "./common.interface";

export interface IOrganizationUnitType extends IidTitleCreateUpdateAt{
    organization_id: number;
    row_status?: number | string;
  }