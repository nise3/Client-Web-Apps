export type certificationStatus = '1' | '2' | '3' | '4';

enum CertificationStatus {
  NOT_SUBMITTED = 1,
  SUBMITTED = 2,
  CERTIFIED = 3,
  NOT_CERTIFIED = 4,
}

export default CertificationStatus;
