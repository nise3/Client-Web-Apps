export interface IDivision {
  loc_division_id: string | number;
}

export interface IDistrict {
  loc_district_id: string | number;
}

// export interface Upazila extends IidTitles, IRowStatus{
//   bbs_code: string;
//   loc_division_id: number;
//   loc_district_id: number;
// }

export interface IUpazila extends IDivision, IDistrict {
  loc_upazila_id?: string | number;
}

export interface IGeometry {
  location_latitude?: string | number;
  location_longitude?: string | number;
}

export interface IGeometryGoogle extends IGeometry {
  google_map_src?: string;
}
