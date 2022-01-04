import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IHumanResource extends IIdTitleCreateUpdateAt {
  organization_id: number | string | undefined;
  organization_title_en?: string;
  organization_title?: string;
  organization_unit_id: number | string | undefined;
  organization_unit_title_en?: string;
  organization_unit_title?: string;
  display_order: number | string;
  is_designation: number | string;
  parent_id?: number | string | null;
  parent?: number | string | null;
  rank_id?: number | string;
  row_status?: string;
  status?: string | number | undefined;
}
