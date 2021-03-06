import {
  API_COUNTRIES,
  API_DISTRICTS,
  API_DIVISIONS,
  API_UNIONS,
  API_UPAZILAS,
} from '../../@softbd/common/apiRoutes';
import {
  useAxiosSWR,
  useDataLocalizationAxiosSWR,
  useLocalizedAxiosSWR,
} from '../../@softbd/hooks/useAxiosSWR';

export function useFetchDivisions(params: any = null) {
  return useAxiosSWR([API_DIVISIONS, params]);
}

export function useFetchLocalizedDivisions(params: any = null) {
  return useDataLocalizationAxiosSWR([API_DIVISIONS, params]);
}

export function useFetchDivision(divisionId: number | null) {
  return useAxiosSWR(divisionId ? API_DIVISIONS + '/' + divisionId : null);
}

export function useFetchDistricts(params: any) {
  return useAxiosSWR([API_DISTRICTS, params]);
}

export function useFetchLocalizedDistricts(params: any) {
  return useDataLocalizationAxiosSWR([API_DISTRICTS, params]);
}

export function useFetchDistrict(districtId: number | null) {
  return useAxiosSWR(districtId ? API_DISTRICTS + '/' + districtId : null);
}

export function useFetchUpazilas(params: any) {
  return useAxiosSWR([API_UPAZILAS, params]);
}

export function useFetchLocalizedUpazilas(params: any) {
  return useDataLocalizationAxiosSWR([API_UPAZILAS, params]);
}

export function useFetchUnions(params: any) {
  return useAxiosSWR([API_UNIONS, params]);
}

export function useFetchLocalizedUnions(params: any) {
  return useDataLocalizationAxiosSWR([API_UNIONS, params]);
}

export function useFetchUpazila(upazilaId: number | null) {
  return useAxiosSWR(upazilaId ? API_UPAZILAS + '/' + upazilaId : null);
}

export function useFetchCountries(params: any) {
  return useLocalizedAxiosSWR([API_COUNTRIES, params]);
}
