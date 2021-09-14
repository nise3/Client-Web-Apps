type User = {
  id: number;
  role_id: number;
  name_en: string;
  name_bn: string;
  email: string;
  organization_id?: number;
  institute_id?: number;
  loc_district_id?: number;
  loc_division_id?: number;
  loc_upazila_id?: number;
  profile_pic?: string;
  password?: string;
};

type Role = {
  id: number;
  title_en: string;
  title_bn: string;
  key: string;
  permission_group_id: number;
  organization_id: number;
  institute_id: number;
};

type Permission = {
  id: number;
  name: string;
  key: string;
};

type PermissionGroup = {
  id: number;
  title_en: string;
  title_bn: string;
  key: string;
  row_status: string;
};

type PermissionSubGroup = {
  id: number;
  title_en: string;
  title_bn: string;
  key: string;
  permission_group_id: number;
  row_status: string;
};
