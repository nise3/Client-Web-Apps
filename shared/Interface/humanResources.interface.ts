import {
  ICreateUpdateAt,
  ICreateUpdateBy,
  IidTitleCreateUpdateAt,
  IOrganizationInfo,
  IParent,
  IRowStatus,
} from './common.interface';

export interface IHumanResource
  extends IidTitleCreateUpdateAt,
    IRowStatus,
    ICreateUpdateBy,
    ICreateUpdateAt,
    Partial<IOrganizationInfo>,
    IParent {
  // organization_id: number | string;
  // organization_title_en: string;
  // organization_title: string;
  // organization_unit_id: number | string;
  // organization_unit_title_en: string;
  // organization_unit_title: string;
  organization_id: number;
  organization_unit_id: number;
  display_order: number | string;
  is_designation: number | string;
  // parent_id?: number | string | null;
  // parent?: number | string | null;
  rank_id?: number | string;
  status?: number;
}
