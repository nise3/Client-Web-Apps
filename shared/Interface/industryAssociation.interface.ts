import {
  IContactPerson,
  ICreateUpdateAt,
  ICreateUpdateBy,
  IMobileEmailAddress,
  IOfficeHeadInfo,
  IRowStatus,
  ITitles,
} from './common.interface';
import {IGeometryGoogle, IUpazila} from './location.interface';

export interface IAssociationMember
  extends ITitles,
    ICreateUpdateAt,
    IRowStatus,
    ICreateUpdateBy,
    IContactPerson,
    IUpazila,
    IOfficeHeadInfo,
    IGeometryGoogle,
    IMobileEmailAddress {
  industry_association_type_id: number;
  trade_number: string;
  // loc_division_id: number;
  // loc_district_id: number;
  // loc_upazila_id: number;
  // location_latitude: string;
  // location_longitude: string;
  // google_map_src: string;
  // address: string;
  // address_en: string;
  country?: string;
  phone_code?: string;
  // mobile: string;

  // email: string;
  fax_no?: string;
  // name_of_the_office_head: string;
  // name_of_the_office_head_en: string;
  // name_of_the_office_head_designation: string;
  // name_of_the_office_head_designation_en: string;
  // contact_person_name: string;
  // contact_person_name_en: string;
  // contact_person_mobile: string;
  // contact_person_email: string;
  // contact_person_designation: string;
  // contact_person_designation_en: string;
  logo?: string;
  domain?: string;
  //row_status: string;
}
