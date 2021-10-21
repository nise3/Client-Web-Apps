export interface ApplicationManagement {

  id: number;
  course_name: string;
  username: string;
  user_name_type: number;
  first_name: string;
  last_name: string;
  gender: number;
  email: string;
  mobile: string;
  date_of_birth: string;
  physical_disability_status: number;
  loc_division_id: number;
  loc_district_id: number;
  row_status: number;
  approval_status: string;
  accepted: number;
  rejected: number;
  created_at: string;
  updated_at: string;
}

const applicationManagement: ApplicationManagement[] = [
  {
    'id': 1,
    'course_name': 'Computer Programming',
    'username': 'enola.skiles@example.net',
    'user_name_type': 1,
    'first_name': 'shohanur',
    'last_name': 'Rahman',
    'gender': 2,
    'email': 'enola.skiles@example.net',
    'mobile': '01754994292',
    'date_of_birth': '0000-00-00',
    'physical_disability_status': 0,
    'loc_division_id': 1,
    'loc_district_id': 1,
    'row_status': 1,
    'approval_status': 'pending',
    'accepted': 0,
    'rejected': 0,
    'created_at': '2021-10-10T07:23:58.000000Z',
    'updated_at': '2021-10-10T07:23:58.000000Z',
  },
  {
    'id': 2,
    'course_name': 'Computer learning',
    'username': 'enola.skiles@example.net',
    'user_name_type': 1,
    'first_name': 'Abdur',
    'last_name': 'Razzak',
    'gender': 2,
    'email': 'enola.skiles@example.net',
    'mobile': '01754994292',
    'date_of_birth': '0000-00-00',
    'physical_disability_status': 0,
    'loc_division_id': 1,
    'loc_district_id': 1,
    'row_status': 1,
    'approval_status': 'pending',
    'accepted': 0,
    'rejected': 0,
    'created_at': '2021-10-10T07:23:58.000000Z',
    'updated_at': '2021-10-10T07:23:58.000000Z',
  },
]

export default applicationManagement;