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
  loc_district_id?: string | number | null;
  loc_division_id?: string | number | null;
  loc_upazila_id?: string | number | null;
  profile_pic?: string;
  password?: string;
  row_status?: string;
};

type Role = {
  id: number;
  title_en: string;
  title: string;
  key: string;
  permission_group_id: string | number | null;
  permission_sub_group_id: string | number | null;
  organization_id?: string | number | null;
  institute_id?: string | number | null;
  description?: string | null;
  row_status?: string;
};

type Permission = {
  id: number;
  title: string;
  title_en: string;
  uri: string;
  key: string;
  method: number | string;
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
