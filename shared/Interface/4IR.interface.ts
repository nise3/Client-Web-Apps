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

export interface IEmployment {
  name: string;
  contact_number: string;
  email: string;
  designation: string;
  industry_name: string;
  starting_salary: number;
  job_starting_data: string;
  medium_of_job: string;
}

export interface ITagLine extends IIdTitleCreateUpdateAt {
  name: string;
  name_en?: string;
  start_date: string;
  row_status: number;
}

export interface IGuideline extends IIdTitleCreateUpdateAt {
  four_ir_initiative_id: number | string;
  file_path?: string;
  guideline_details?: string;
  row_status?: number;
}

export interface IScaleUp extends IIdTitleCreateUpdateAt {
  project_advancement: string;
  project_budget: string | number;
  previous_budget: string | number;
  scale_up: string;
  project_details: string;
}

export interface ITNAReport {
  workshop_name: string;
  skill_required: string;
  start_date: string;
  end_date: string;
  file_path: string;
  venue?: string;
}

export interface IOccupation extends IIdTitleCreateUpdateAt {
  title: string;
  title_en?: string;
  row_status?: number | string;
}
