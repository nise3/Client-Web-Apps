import { IidTitleCreateUpdateAt } from "./common.interface";

export interface IService extends IidTitleCreateUpdateAt{
    key: number;
    row_status: number | string;
  }