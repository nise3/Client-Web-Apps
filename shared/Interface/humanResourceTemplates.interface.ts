import {
  ICreateUpdateBy,
  IidTitleCreateUpdateAt,
  IOrganizationInfo,
  IParent,
  IRowStatus,
} from './common.interface';

export interface IHumanResourceTemplate
  extends IidTitleCreateUpdateAt,
    IRowStatus,
    ICreateUpdateBy,
    IOrganizationInfo,
    IParent {
  organization_id: number;
  // organization_title_en: string;
  // organization_title: string;
  organization_unit_type_id: number;
  // organization_unit_type_title_en: string;
  // organization_unit_type_title: string;
  rank_id?: number | string;
  // parent_id?: number | string | null;
  // parent?: number | string | null;
  display_order: number;
  is_designation: number;
  status?: number;
  //row_status?: string;
}
