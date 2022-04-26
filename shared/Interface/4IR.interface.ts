import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IProject extends IIdTitleCreateUpdateAt {
  project_name: string;
  project_name_en?: string;
  organization_name: number | string;
  organization_name_en?: number | string;
  four_ir_occupation_id: number | string;
  start_date: number | string;
  completion_step: number | string;
  form_step: number | string;
  details?: string;
  budget?: string;
  tasks: any[];
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

export interface IOccupation extends IIdTitleCreateUpdateAt {
  title: string;
  title_en?: string;
  row_status?: number | string;
}
