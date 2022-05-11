import { IBatch } from "./institute.interface";

export interface ICertificate {
  id: number;
  template: string;
  title_en: string;
  title: string;
  result_type: number;
  issued_at: string;
}

export interface ICertificateIssue {
  youth_id: string;
  batch_id: string;
  certificate_id: number;
}

export interface ICertificateIssueView extends ICertificateIssue{
  isIssued: boolean;
}

export interface ICertificateBatchSetting extends IBatch{
  certificate_type?: number
}