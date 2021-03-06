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
  completion_step?: number | string;
  form_step?: number | string;
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
  employment_status: string;
  name: string;
  name_en: string;
  contact_number: string;
  email: string;
  designation: string;
  industry_name: string;
  industry_name_en: string;
  starting_salary: number;
  job_starting_date: string;
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
  four_ir_initiative_id?: any;
  project_name?: string;
  project_name_en?: string;
  budget?: string;
  implement_timeline?: string;
  start_date?: string;
  end_date?: string;
  beneficiary_target?: string;
  number_of_beneficiary?: string;
  implement_area?: string;
  approval_status?: string;
  approve_by?: string;
  documents_approval_status?: string;
  file_path?: string;
}

export interface ITNAReport {
  workshop_method_workshop_numbers?: number | string;
  workshop_method_file?: string;
  fgd_workshop_numbers?: number | string;
  fgd_workshop_file?: string;
  industry_visit_workshop_numbers?: number | string;
  industry_visit_file?: string;
  desktop_research_workshop_numbers?: number | string;
  desktop_research_file?: string;
  existing_report_review_workshop_numbers?: number | string;
  existing_report_review_file?: string;
  others_workshop_numbers?: number | string;
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
  is_developed_financial_proposal: number | string;
  total_amount?: number | string;
  approve_by?: string;
  row_status: number | string;
  file_path?: string | null;
  comment: string;
}

export interface ISkillDevelopment extends IIdTitleCreateUpdateAt {
  traning_center: string;
  batch_start_date: string;
  batch_end_date: string;
  batch_number: number;
}
