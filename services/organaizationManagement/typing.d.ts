type RankType = {
    key: number;
    id: number;
    organization_id?: number;
    title_en: string;
    title_bn: string;
    description?: string;
    organization_title_en?: string;
    row_status?: string;
};

type Rank = {
    key: string | number;
    id: number;
    title_en?: string;
    title_bn?: string;
    organization_id?: number;
    organization_title_en: string;
    rank_type_id?: number;
    rank_type_title_en: string;
    grade?: string;
    display_order?: string;
    row_status?: any;
    created_at?: string;
    updated_at?: string;
};

type OrganizationType = {
    id: number;
    title_en: string;
    title_bn: string;
    is_government: boolean;
    row_status: number;
    created_at?: string;
    updated_at?: string;
};

type Organization = {
    id: number;
    title_en: string;
    title_bn: string;
    contact_person_designation: string;
    contact_person_email: string;
    contact_person_mobile: string;
    contact_person_name: string;
    description?: string;
    domain?: string;
    email?: string;
    fax_no?: string;
    loc_district_id?: number;
    loc_division_id?: number;
    loc_upazila_id?: number;
    logo?: string;
    address?: string;
    mobile?: string;
    organization_types_title?: string;
    organization_type_id: number;
    row_status: number;
    created_at?: string;
    updated_at?: string;
};

type Service = {
    key: number;
    id: number;
    title_en: string;
    title_bn: string;
    row_status: string;
    updated_at?: string;
    crated_at?: string;
};

type JobSector = {
    id: number;
    title_en: string;
    title_bn: string;
    row_status: string;
    updated_at?: string;
    crated_at?: string;
};

type Occupation = {
    id: number;
    title_en: string;
    title_bn: string;
    job_sector_id: string;
    row_status: number;
    updated_at?: string;
    crated_at?: string;
};

type OrganizationUnit = {
    id: number;
    title_en: string;
    title_bn: string;
    organization_id: number;
    organization_unit_type_id: number;
    loc_division_id: number;
    loc_district_id: number;
    loc_upazila_id: number;
    employee_size: number;
    address: string;
    mobile: string;
    email: string;
    fax_no: string;
    contact_person_designation: string;
    contact_person_email: string;
    contact_person_mobile: string;
    contact_person_name: string;
    services?: Array<number>;
    row_status: number;
    updated_at?: string;
    crated_at?: string;
};

type OrganizationUnitType = {
    id: number;
    title_en: string;
    title_bn: string;
    organization_id: number;
    row_status: number;
    updated_at?: string;
    crated_at?: string;
};

type Skill = {
    id: number;
    title_en: string;
    title_bn: string;
    description: string;
    row_status?: string;
    updated_at?: string;
    crated_at?: string;
};

type HumanResourceTemplate = {
    id: number;
    title_en: string;
    title_bn: string;
    organization_id: number;
    organization_unit_type_id: number;
    rank_id?: number;
    parent?: string;
    display_order?: number;
    is_designation?: number;
    updated_at?: string;
    crated_at?: string;
};

type HumanResource = {
    id: number;
    title_en: string;
    title_bn: string;
    display_order?: number;
    is_designation?: number;
    parent?: string;
    updated_at?: string;
    crated_at?: string;
};

