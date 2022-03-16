export type certificationStatus = '1' | '2' | '3' | '4';

enum CertificationStatus {
  NOTSUBMITTED = 1,
  SUBMITTED = 2,
  CERTIFIED = 3,
  NOTCERTIFIED = 4,
}

export default CertificationStatus;
