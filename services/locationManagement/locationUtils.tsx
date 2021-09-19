export function filterDistrictsByDivisionId(
  districts: Array<District>,
  divisionId: number | null,
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
  districtId: number | null,
) {
  if (upazilas && districtId) {
    return upazilas.filter((upazila) => upazila.loc_district_id == districtId);
  } else {
    return [];
  }
}