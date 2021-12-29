import {
  IContactPerson,
  ICreateUpdateAt,
  IidTitles,
  IMobileEmailAddress,
  IOfficeHeadInfo,
  IRowStatus,
} from './common.interface';
import {IUpazila} from './location.interface';

export interface IAssociationRegistration
  extends IidTitles,
    ICreateUpdateAt,
    IRowStatus,
    IContactPerson,
    IUpazila,
    IOfficeHeadInfo,
    IMobileEmailAddress {
  industry_association_type_id: string;
  //title_en?: any;
  //title: string;
  trade_number: string;
  password: string;
  password_confirmation: string;
  // loc_division_id: string;
  // loc_district_id: string;
  // loc_upazila_id?: number;
  // name_of_the_office_head: string;
  // name_of_the_office_head_en?: string;
  // name_of_the_office_head_designation: string;
  // name_of_the_office_head_designation_en?: string;
  // address?: string;
  // address_en?: string;
  // mobile: string;
  // email: string;
  // contact_person_name: string;
  // contact_person_name_en?: string;
  // contact_person_mobile: string;
  // contact_person_email: string;
  // contact_person_designation: string;
  // contact_person_designation_en?: string;

  //row_status: string;
  // updated_at: Date;
  // created_at: Date;
  //id: number;
}