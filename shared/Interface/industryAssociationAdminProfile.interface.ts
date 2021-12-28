import {
  IContactPerson,
  ICreateUpdateAt,
  ICreateUpdateBy,
  IDeleteAt,
  IidTitles,
  IMobileEmailAddress,
  IOfficeHeadInfo,
  IRowStatus,
} from './common.interface';
import {IGeometryGoogle, IUpazila} from './location.interface';

export interface IAssociationAdmin
  extends IidTitles,
    ICreateUpdateAt,
    ICreateUpdateBy,
    IDeleteAt,
    IRowStatus,
    Partial<IContactPerson>,
    IUpazila,
    IOfficeHeadInfo,
    IGeometryGoogle,
    IMobileEmailAddress {
  //id: number;
  industry_association_type_id?: number;
  //title: string;
  //title_en?: any;
  // loc_division_id: string;
  // loc_district_id: string;
  // loc_upazila_id?: number;
  // location_latitude?: string;
  // location_longitude?: string;
  // google_map_src?: string;
  // address?: string;
  // address_en?: string;
  country?: string;
  phone_code?: string;
  // mobile: string;
  // email: string;
  fax_no?: string;
  trade_number?: string;
  // name_of_the_office_head: string;
  // name_of_the_office_head_en?: string;
  // name_of_the_office_head_designation: string;
  // name_of_the_office_head_designation_en?: string;
  contact_person_name: string;
  // contact_person_name_en?: string;
  // contact_person_mobile: string;
  // contact_person_email: string;
  contact_person_designation: string;
  // contact_person_designation_en?: string;
  logo?: string;
  domain?: string;
  description?: string;
  description_en?: string;
  //row_status: string;
  // created_by?: any;
  // updated_by?: any;

  // created_at: Date;
  // updated_at: Date;
  //deleted_at?: any;
}
