import {
  API_DISTRICTS,
  API_DIVISIONS,
  API_UPAZILAS,
} from '../../@softbd/common/apiRoutes';
import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_HUMAN_RESOURCE_TEMPLATES} from '../organaizationManagement/HumanResourceTemplateService';

export function useFetchDivisions(params: any) {
  return useAxiosSWR([API_DIVISIONS, params]);
}

export function useFetchDivision(divisionId: number | null) {
  return useAxiosSWR(divisionId ? API_DIVISIONS + '/' + divisionId : null);
}

export function useFetchDistricts(params: any) {
  return useAxiosSWR([API_DISTRICTS, params]);
}

export function useFetchDistrict(districtId: number | null) {
  return useAxiosSWR(districtId ? API_DISTRICTS + '/' + districtId : null);
}

export function useFetchUpazilas(params: any) {
  return useAxiosSWR([API_UPAZILAS, params]);
}

export function useFetchUpazila(upazilaId: number | null) {
  return useAxiosSWR(upazilaId ? API_UPAZILAS + '/' + upazilaId : null);
}

export function useFetchHumanResourceTemplates(
  humanResourceTemplateId: number | null,
) {
  return useAxiosSWR(
    humanResourceTemplateId
      ? API_HUMAN_RESOURCE_TEMPLATES + '/' + humanResourceTemplateId
      : null,
  );
}
