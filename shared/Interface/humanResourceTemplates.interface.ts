import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IHumanResourceTemplate extends IIdTitleCreateUpdateAt {
  organization_id: number | string;
  organization_title_en?: string;
  organization_title?: string;
  organization_unit_type_id: number | string;
  organization_unit_type_title_en?: string;
  organization_unit_type_title?: string;
  rank_id?: number | string;
  parent_id?: number | string | null;
  parent?: number | string | null;
  display_order: number | string;
  is_designation: number | string;
  status?: number;
  row_status?: string;
}
