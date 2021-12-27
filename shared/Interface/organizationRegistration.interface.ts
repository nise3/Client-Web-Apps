import {
  IContactPerson,
  ICreateUpdateAt,
  IidTitles,
  IMobileEmailAddress,
  IOfficeHeadInfo,
} from './common.interface';
import {IUpazila} from './location.interface';

export interface IOrganizationRegistration
  extends IidTitles,
    ICreateUpdateAt,
    IContactPerson,
    IUpazila,
    Partial<IOfficeHeadInfo>,
    IMobileEmailAddress {
  //title_en?: any;
  //title: string;
  organization_type_id: string;
  industry_association_id: number;
  name_of_the_office_head: string;
  address: string;
  password: string;
  password_confirmation: string;
  // email: string;
  // mobile: string;
  // contact_person_mobile: string;
  // name_of_the_office_head: string;
  // name_of_the_office_head_en?: string;
  // name_of_the_office_head_designation?: string;
  // name_of_the_office_head_designation_en?: string;
  // contact_person_name: string;
  // contact_person_name_en?: string;
  // contact_person_designation: string;
  // contact_person_designation_en?: string;
  // contact_person_email: string;
  // loc_division_id: number;
  // loc_district_id: number;
  // loc_upazila_id?: number;
  // address: string;
  // address_en?: string;
  // updated_at: Date;
  // created_at: Date;
  //id: number;
}
