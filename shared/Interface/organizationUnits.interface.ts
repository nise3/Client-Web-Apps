import {IIdTitleCreateUpdateAt} from './common.interface';

export interface IOrganizationUnit extends IIdTitleCreateUpdateAt {
  organization_id?: number;
  organization_unit_type_id: number;
  loc_division_id?: number;
  loc_district_id?: number;
  loc_upazila_id?: number;
  employee_size: number;
  address?: string;
  mobile?: string;
  email?: string;
  fax_no?: string;
  contact_person_designation?: string;
  contact_person_email?: string;
  contact_person_mobile?: string;
  contact_person_name?: string;
  services?: Array<number>;
  row_status?: number | string;
}
