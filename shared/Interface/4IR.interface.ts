import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IProject extends IIdTitleCreateUpdateAt {
  project_name: string;
  project_name_en?: string;
  occupation_id: number | string;
  organization_name: number | string;
  organization_name_en?: number | string;
  project_start_date: number | string;
  project_details?: string;
  project_details_en?: string;
  project_budget?: string;
  project_check_list: any[];
  row_status?: number | string;
}
