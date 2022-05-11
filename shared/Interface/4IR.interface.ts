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

export interface IInitiative extends IIdTitleCreateUpdateAt {
  name: string;
  name_en?: string;
  organization_name: number | string;
  organization_name_en?: number | string;
  four_ir_occupation_id: number | string;
  start_date: number | string;
  completion_step: number | string;
  form_step: number | string;
  details?: string;
  budget?: number;
  tasks: any[];
  row_status?: number | string;
  designation: string;
  is_skill_provide: number;
  end_date: string;
  file_path: string;
  four_ir_tagline_id?: number;
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
  sector_name?: string | number;
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
  workshop_method_workshop_numbers?: number;
  workshop_method_file?: string;
  fgd_workshop_numbers?: number;
  fgd_workshop_file?: string;
  industry_visit_workshop_numbers?: number;
  industry_visit_file?: string;
  desktop_research_workshop_numbers?: number;
  desktop_research_file?: string;
  existing_report_review_workshop_numbers?: number;
  existing_report_review_file?: string;
  others_workshop_numbers?: number;
  others_file?: string;
  file_path?: string;
  row_status?: number;
}

export interface IOccupation extends IIdTitleCreateUpdateAt {
  title: string;
  title_en?: string;
  row_status?: number | string;
}

export interface IResource extends IIdTitleCreateUpdateAt {
  approval_status: number | string;
  budget_approval_status: number | string;
  given_budget: number | string;
  row_status: number | string;
}
