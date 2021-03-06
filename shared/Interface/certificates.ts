import { IBatch } from "./institute.interface";

export interface ICertificate {
  id: number;
  template: string;
  title_en: string;
  title: string;
  result_type: number;
  language: number;
  issued_at: string;
}

export interface ICertificateView extends ICertificate {
  result_type_name?: string;
}

export interface ICertificateIssue {
  id?: number;
  youth_id: number;
  batch_id: number;
  course_id: number;
  certificate_id: number;
}

export interface ICertificateIssueView extends ICertificateIssue{
  isIssued: boolean;
}

export interface ICertificateBatchSetting extends IBatch{
  certificate_type?: number;
}