import {Event, SlotInfo} from 'react-big-calendar';

export interface IidTitle{
  id: number;
  title: string;
}
export interface IidTitles extends  IidTitle{
  title_en?: string;
}
export interface IidTitleCreateUpdateAt extends IidTitles{
  updated_at?: string;
  crated_at?: string;
}
export interface IFAQ{
  show_in: number;
  institute_id?: number;
  organization_id?: number;
  industry_association_id?: number;
  question: string;
  answer: string;
  row_status: number;
  other_language_fields?: object;
}
export interface IPartner extends IidTitle{
  main_image_path?: string;
  thumb_image_path?: string;
  grid_image_path?: string;
  domain?: string;
  image_alt_title?: string;
  row_status: string;
  other_language_fields?: object;
}
export interface ICalendar extends Event, Partial<IidTitleCreateUpdateAt>{
  youth_id?: number | string;
  institute_id?: number | string;
  organization_id?: number | string;
  batch_id?: number | string;
  industry_association_id?: number | string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  color?: string;
}
export interface ICalendarDto extends Omit<ICalendar, 'start'|'end'>{
  start?: string;
  end?: string;
}
export interface ICalendarSlotInfo extends Omit<SlotInfo, 'start'|'end'>{
  id: string;
}
export interface ICalendarQuery{
  type: string;
  youth_id?: string | number;
  institute_id?: string | number;
}
export interface IStaticPageDto extends IidTitle{
  sub_title?: string;
  show_in?: number | string;
  content_slug_or_id?: string;
  institute_id?: string | number;
  organization_id?: string | number;
  content_type?: string;
  contents?: string;
  row_status?: number | string;
}
export interface IStaticPageBlock extends IStaticPageDto{
  id: string;
}
export interface IStaticPageContent extends IidTitleCreateUpdateAt{
  static_page_type_id?: number;
  show_in: string;
  show_in_label?: string;
  institute_id?: string;
  institute_title?: string;
  institute_title_en?: string;
  organization_id?: string;
  organization_title?: string;
  organization_title_en?: string;
  industry_association_id?: any;
  content_en?: any;
  attachment_type?: string;
  template_code?: string;
  is_button_available?: string;
  link?: string;
  is_attachment_available?: string;
  image_path?: any;
  video_url?: any;
  image_alt_title_en?: any;
  content?: any;
  button_text?: string;
  image_alt_title?: any;
  other_language_fields?: object;
  row_status?: string | number;
  created_by?: string;
  updated_by?: string;
}
export interface IStaticBlockAddEditPopupProps {
  pageCode: string;
  pageCategory: number;
  onClose: () => void;
}
