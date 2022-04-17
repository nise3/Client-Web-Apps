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

export interface ICell extends IIdTitleCreateUpdateAt {
  name: string;
  name_en?: string;
  email: string;
  mobile_number: string;
  address?: string;
  designation: string;
  designation_en?: string;
  row_status?: number | string;
}

export interface ICS extends IIdTitleCreateUpdateAt {
  experts_list: string;
  level?: string;
  approved_by?: string;
  organization_name?: string;
  sector_name?: string;
  supported_by?: string;
  comment?: string;
  row_status?: number | string;
}

export interface IScaleUp extends IIdTitleCreateUpdateAt {
  project_advancement: string;
  project_budget: string | number;
  previous_budget: string | number;
  scale_up: string;
  project_details: string;
}
