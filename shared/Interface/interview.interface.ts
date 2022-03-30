import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IRecruitmentStep extends IIdTitleCreateUpdateAt {
  job_id: string | number;
  title: string;
  title_en?: string;
  step_type: string | number;
  is_interview_reschedule_allowed: string | number;
  interview_contact?: string;
  row_status?: string;
  deleted_at?: string;
}
