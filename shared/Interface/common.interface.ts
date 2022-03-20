import {Event, SlotInfo} from 'react-big-calendar';
import {
  ColumnInstance,
  TableInstance,
  TableState,
  FilterValue,
  IdType,
  Filters,
  FilterProps,
  Row,
  CellProps,
  Cell,
  CellValue,
} from 'react-table';

export interface IIdHolder {
  id: number;
}

export interface IIdTitle extends IIdHolder {
  title: string;
}

export interface IIdTitles extends IIdTitle {
  title_en?: string;
}

export interface ICreateUpdateAt {
  updated_at?: string | undefined;
  created_at?: string | undefined;
}

export interface IIdTitleCreateUpdateAt extends IIdTitles, ICreateUpdateAt {}

export interface IFAQ {
  show_in: number;
  institute_id?: number;
  organization_id?: number;
  industry_association_id?: number;
  question: string;
  answer: string;
  row_status: number;
  other_language_fields?: object;
}

export interface IRPLSector {
  title: string;
  row_status?: number;
  translations?: object;
}

export interface IRPLOccupation {
  rpl_sector_id: number | string;
  title: string;
  title_en?: string;
  row_status: number;
  translations?: object;
}
export interface IRPLLevel {
  rpl_sector_id: number | string;
  title: string;
  title_en?: string;
  translations?: object;
  rpl_occupation_id: number | string;
  sequence_order: number;
}

export interface IAssessment {
  rpl_occupation_id: number | string;
  rpl_level_id: number | string;
  title: string;
  title_en?: string;
}

export interface IRplAssessment {
  rpl_sector_id: number | string;
  youth_id: number | string;
  assessment_id: number | string;
  target_country_id: number | string;
  rto_country_id: number | string;
  rto_id: number | string;
  rpl_occupation_id: number | string;
  rpl_level_id: number | string;
  rto_batch_id?: number | string;
}

export interface IPartner extends IIdTitle {
  main_image_path?: string;
  thumb_image_path?: string;
  grid_image_path?: string;
  domain?: string;
  image_alt_title?: string;
  row_status: string;
  other_language_fields?: object;
}

export interface ICalendar
  extends Event,
    Partial<Omit<IIdTitleCreateUpdateAt, 'title'>> {
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

export interface ICalendarDto extends Omit<ICalendar, 'start' | 'end'> {
  start?: string;
  end?: string;
}

export interface ICalendarSlotInfo extends Omit<SlotInfo, 'start' | 'end'> {
  id: string;
}

export interface ICalendarQuery {
  type: string;
  youth_id?: string | number;
  institute_id?: string | number;
}

export interface IStaticPageCommon extends IIdTitle {
  sub_title?: string;
}

export interface IStaticPageDto extends IIdTitle, IStaticPageCommon {
  show_in?: number | string;
  content_slug_or_id?: string;
  institute_id?: string | number;
  organization_id?: string | number;
  content_type?: string;
  contents?: string;
  row_status?: number | string;
}

export interface IStaticPageBlock extends IStaticPageDto, IStaticPageCommon {
  // id?: string | number | undefined;
}

export interface IStaticPageContent
  extends IIdTitleCreateUpdateAt,
    IStaticPageCommon {
  static_page_type_id?: number | undefined;
  show_in: string | number | undefined;
  show_in_label?: string | undefined;
  institute_id?: string | undefined;
  institute_title?: string | undefined;
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
  row_status?: string | number | undefined;
  created_by?: string;
  updated_by?: string;
}

export interface IStaticBlockAddEditPopupProps {
  pageCode: string;
  pageCategory: number;
  onClose: () => void;
}

export interface IColumnInstance<T extends object> extends ColumnInstance<any> {
  filter?: any;
  canFilter: boolean;
  filterValue: any;
  setFilter: (updater: any) => void;
  preFilteredRows: Array<any>;
  align: string;
  selectFilterItems?: Array<ISelectFilterItem>;
}

export interface IFilters<T extends object> extends Filters<any> {
  id: IdType<any>;
  value: FilterValue;
}

export interface ITableState extends TableState {
  filters: IFilters<any>;
}

export interface IFilterProps<T extends object> extends FilterProps<any> {
  column: IColumnInstance<any>;
}

export interface ITableInstance<T extends object> extends TableInstance<any> {
  setAllFilters: (
    updater: Filters<any> | ((filters: Filters<any>) => Filters<any>),
  ) => void;
  setFilter: (id: any, updater: any) => void;
  allColumns: Array<IColumnInstance<any>>;
  state: ITableState;
  page: Array<Row>;
  prepareRow: (row: Row) => void;
  gotoPage: (updater: ((pageIndex: number) => number) | number) => void;
  setPageSize: (pageSize: number) => void;
}

export interface ICellProps<T extends object> extends CellProps<any> {
  column: IColumnInstance<any>;
  row: Row<any>;
  cell: Cell<any, any>;
  value: CellValue<any>;
}

export interface ISelectFilterItem {
  id: number | string;
  title: string;
}

export interface FilterItem {
  filterKey: string;
  filterValue: any;
}

export interface IPublication extends IIdTitleCreateUpdateAt {
  author: string;
  author_en?: string;
  description: string;
  description_en?: string;
  industry_association_id: string | number | undefined;
  image_path?: string;
  file_path?: string;
  row_status?: string;
  deleted_at?: string;
}
