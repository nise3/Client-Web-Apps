type User = {
  id: number;
  role_id: string;
  name_en: string;
  name: string;
  username: string;
  user_type: string;
  email: string;
  mobile: string;
  organization_id?: string | number | null;
  institute_id?: string | number | null;
  loc_district_id?: number;
  loc_division_id?: number;
  loc_upazila_id?: number;
  profile_pic?: string;
  password?: string;
  row_status?: string;
};

type Role = {
  id: number;
  title_en: string;
  title: string;
  key: string;
  permission_sub_group_id: string | number | null;
  organization_id?: string | number | null;
  institute_id?: string | number | null;
  row_status?: string;
};

type Permission = {
  id: number;
  name: string;
  uri: string;
  method: string;
  module: string;
  method_name?: string;
};

type PermissionGroup = {
  id: number;
  title_en: string;
  title: string;
  key: string;
  row_status: string;
};

type PermissionSubGroup = {
  id: number;
  title_en: string;
  title: string;
  key: string;
  permission_group_id: number;
  row_status: string;
};
