type Division = {
    id: number;
    title_en: string;
    title_bn: string;
    bbs_code: string;
};

type District = {
    id: number;
    title_en: string;
    title_bn: string;
    bbs_code: string;
    loc_division_id: number;
};

type Upazila = {
    id: number;
    title_en: string;
    title_bn: string;
    bbs_code: string;
    loc_division_id: number;
    loc_district_id: number;
};

