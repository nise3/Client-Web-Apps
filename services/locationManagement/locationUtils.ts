import {District, Upazila} from '../../shared/Interface/location.interface';

export function filterDistrictsByDivisionId(
  districts: Array<District>,
  divisionId: number | string | null | undefined,
) {
  if (districts && divisionId) {
    return districts.filter(
      (district) => district.loc_division_id == divisionId,
    );
  } else {
    return [];
  }
}

export function filterUpazilasByDistrictId(
  upazilas: Array<Upazila>,
  districtId: number | string | null | undefined,
) {
  if (upazilas && districtId) {
    return upazilas.filter((upazila) => upazila.loc_district_id == districtId);
  } else {
    return [];
  }
}

export function filterUnionsByUpazilaId(
  unions: Array<Upazila>,
  upazilaId: number | string | null | undefined,
) {
  if (unions && upazilaId) {
    return unions.filter((union: any) => union.loc_upazila_id == upazilaId);
  } else {
    return [];
  }
}
