import {IIdTitleCreateUpdateAt} from './common.interface';

// export interface IRankType extends IidTitles{
//   key: number;
//   organization_id?: number | string | undefined;
//   description?: string;
//   description_en?: string;
//   row_status?: number | string;
// }

// export interface IRank extends IidTitleCreateUpdateAt{
//   key: string | number;
//   organization_id?: number | string;
//   organization_title_en: string;
//   rank_type_id: string;
//   rank_type_title_en: string;
//   grade?: string;
//   display_order?: string;
//   row_status?: number | string;
// }

// export interface IOrganizationType extends IidTitleCreateUpdateAt{
//   is_government: number;
//   row_status: number | string;
// }

export interface IOrganization extends IIdTitleCreateUpdateAt {
  //permission_sub_group: number | string;
  permission_sub_group_id: number | string;
  industry_association_id: number;
  address: string;
  contact_person_designation: string;
  contact_person_designation_en?: string;
  contact_person_email: string;
  contact_person_mobile: string;
  contact_person_name: string;
  contact_person_name_en?: string;
  name_of_the_office_head?: string;
  name_of_the_office_head_en?: string;
  membership_id: string;
  sub_trades?: Array<any>;
  name_of_the_office_head_designation?: string;
  name_of_the_office_head_designation_en?: string;
  description?: string;
  description_en?: string;
  domain?: string;
  email?: string;
  fax_no?: string;
  loc_district_id?: number | string;
  loc_division_id?: number | string;
  loc_upazila_id?: number | string;
  location_latitude?: number | string;
  location_longitude?: number | string;
  google_map_src?: number | string;
  logo?: string;
  address_en?: string;
  country?: string;
  phone_code?: string | number;
  mobile?: string;
  organization_types_title?: string;
  organization_type_id: number | string;
  row_status?: number | string;
  industry_association_trade_id?: number | string;
  additional_information?: any;
}

// export interface IService extends IidTitleCreateUpdateAt{
//   key: number;
//   row_status: number | string;
// }

// export interface IJobSectorDto extends IidTitleCreateUpdateAt{
//   row_status?: number | string;
// }
// export interface IJobSector extends IJobSectorDto{
//   id: number;
// }

// export interface IOccupation extends IidTitleCreateUpdateAt{
//   job_sector_id: number | string;
//   row_status: number | string;
// }

// export interface IOrganizationUnit extends IidTitleCreateUpdateAt{
//   organization_id: number;
//   organization_unit_type_id: number;
//   loc_division_id: number;
//   loc_district_id: number;
//   loc_upazila_id: number;
//   employee_size: number;
//   address: string;
//   mobile: string;
//   email: string;
//   fax_no: string;
//   contact_person_designation: string;
//   contact_person_email: string;
//   contact_person_mobile: string;
//   contact_person_name: string;
//   services?: Array<number>;
//   row_status: number | string;
// }

// export interface IOrganizationUnitType extends IidTitleCreateUpdateAt{
//   organization_id: number;
//   row_status?: number | string;
// }

export interface ISkill extends IIdTitleCreateUpdateAt {
  description: string;
  row_status?: number | string;
}

// export interface IHumanResourceTemplate extends IidTitleCreateUpdateAt{
//   organization_id: number | string;
//   organization_title_en: string;
//   organization_title: string;
//   organization_unit_type_id: number | string;
//   organization_unit_type_title_en: string;
//   organization_unit_type_title: string;
//   rank_id?: number | string;
//   parent_id?: number | string | null;
//   parent?: number | string | null;
//   display_order?: number | string;
//   is_designation?: number | string;
//   status?: number;
//   row_status?: string;
// }

// export interface IHumanResource extends IidTitleCreateUpdateAt{
//   organization_id: number | string;
//   organization_title_en: string;
//   organization_title: string;
//   organization_unit_id: number | string;
//   organization_unit_title_en: string;
//   organization_unit_title: string;
//   display_order?: number | string;
//   is_designation?: number | string;
//   parent_id?: number | string | null;
//   parent?: number | string | null;
//   rank_id?: number | string;
//   row_status?: string;
// }

export interface IBatchAssign {
  batch_id?: number | string | null;
}
