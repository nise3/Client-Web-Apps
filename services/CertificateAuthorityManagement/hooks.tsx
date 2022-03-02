import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_REGISTERED_TRAINING_ORGANIZATIONS,
  API_RPL_LEVELS,
  API_RPL_OCCUPATIONS,
  API_RPL_SECTORS,
  API_RTO_COUNTRIES,
  API_SUBJECTS,
} from '../../@softbd/common/apiRoutes';

export function useFetchRTO(rtoId: number | null) {
  return useAxiosSWR(
    rtoId ? API_REGISTERED_TRAINING_ORGANIZATIONS + '/' + rtoId : null,
  );
}

export function useFetchRTOCountries() {
  return useAxiosSWR(API_RTO_COUNTRIES);
}

export function useFetchRPLSectors() {
  return useAxiosSWR(API_RPL_SECTORS);
}

export function useFetchRPLSector(RPLSectorId: number | null) {
  return useAxiosSWR(RPLSectorId ? API_RPL_SECTORS + '/' + RPLSectorId : null);
}

export function useFetchRPLSectorsWithFilter(params: any = null) {
  return useAxiosSWR(params ? [API_RPL_SECTORS, params] : null);
}

export function useFetchRPLOccupation(RPLOccupationId: number | null) {
  return useAxiosSWR(
    RPLOccupationId ? API_RPL_OCCUPATIONS + '/' + RPLOccupationId : null,
  );
}
export function useFetchRPLOccupations(params: any = null) {
  return useAxiosSWR(params ? [API_RPL_OCCUPATIONS, params] : null);
}

export function useFetchRPLLevels(params: any = null) {
  return useAxiosSWR(params ? [API_RPL_LEVELS, params] : null);
}

export function useFetchRPLLevel(rplLevelId: number | null) {
  return useAxiosSWR(rplLevelId ? API_RPL_LEVELS + '/' + rplLevelId : null);
}

export function useFetchSubject(subjectId: number | null) {
  return useAxiosSWR(subjectId ? API_SUBJECTS + '/' + subjectId : null);
}

export function useFetchSubjects() {
  return useAxiosSWR(API_SUBJECTS);
}
