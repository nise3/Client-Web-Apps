import {IIdHolder, IIdTitles} from './common.interface';

export interface IUser extends IIdHolder {
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
  branch_id?: string | number;
  training_center_id?: string | number;
}

export interface IRole extends IIdTitles {
  key: string;
  permission_group_id: string | number | null;
  permission_sub_group_id: string | number | null;
  organization_id?: string | number | null;
  institute_id?: string | number | null;
  description?: string | null;
  row_status?: string;
}

export interface IPermission extends IIdTitles {
  uri: string;
  key: string;
  method: number | string;
  module: string;
  method_name?: string;
}

export interface IPermissionGroup extends IIdTitles {
  key: string;
  row_status: string;
}

export interface IPermissionSubGroup extends IIdTitles {
  key: string;
  permission_group_id: number;
  row_status: string;
}

export interface IPermissionGroupAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}
