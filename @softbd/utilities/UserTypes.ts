export type UserType = '1' | '2' | '3' | '4';

enum UserTypes {
  SYSTEM_USER = '1',
  ORGANIZATION_USER = '2',
  INSTITUTE_USER = '3',
  YOUTH_USER = '4',
  INDUSTRY_ASSOCIATION_USER = '5',
}

export default UserTypes;
