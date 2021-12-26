import { IidTitleCreateUpdateAt } from "./common.interface";

export interface IOrganizationType extends IidTitleCreateUpdateAt{
    is_government: number;
    row_status: number | string;
  }