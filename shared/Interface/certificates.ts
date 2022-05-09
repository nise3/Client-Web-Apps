export interface ICertificate {
  template: string;
  title_en: string;
  title: string;
  result_type: number;
}

export interface ICertificateIssue {
  youth_id: string;
  batch_id: string;
  certificate_id: string;
}