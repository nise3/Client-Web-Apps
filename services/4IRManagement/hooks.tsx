import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_4IR_CBLM,
  API_4IR_CELL,
  API_4IR_CS,
  API_4IR_CURRICULUM,
  API_4IR_INITIATIVE,
  API_4IR_OCCUPATIONS,
  API_4IR_PROJECT_ANALYSIS,
  API_4IR_Resource_Management,
  API_4IR_SCALE_UP,
  API_4IR_SECTORS,
  API_4IR_TAGLINES,
  API_4IR_TOT,
} from '../../@softbd/common/apiRoutes';

export function useFetch4IRInitiative(initiativeId: number | null) {
  return useAxiosSWR(
    initiativeId ? API_4IR_INITIATIVE + '/' + initiativeId : null,
  );
}

export function useFetch4IInitiative(initiativeId: number | null) {
  return useAxiosSWR(
    initiativeId ? API_4IR_INITIATIVE + '/' + initiativeId : null,
  );
}

export function useFetch4IRCell(cellId: number | null) {
  return useAxiosSWR(cellId ? API_4IR_CELL + '/' + cellId : null);
}

export function useFetch4IRCS(CSId: number | null) {
  return useAxiosSWR(CSId ? API_4IR_CS + '/' + CSId : null);
}

export function useFetch4IRSectors() {
  return useAxiosSWR(API_4IR_SECTORS);
}

export function useFetch4IRCBLM(CBLMId: number | null) {
  return useAxiosSWR(CBLMId ? API_4IR_CBLM + '/' + CBLMId : null);
}

export function useFetch4IRCurriculum(CurrId: number | null) {
  return useAxiosSWR(CurrId ? API_4IR_CURRICULUM + '/' + CurrId : null);
}

export function useFetch4IRScaleUp(scaleUpId: number | null) {
  return useAxiosSWR(scaleUpId ? API_4IR_SCALE_UP + '/' + scaleUpId : null);
}

export function useFetchFourIROccupation(occupationId: number | null) {
  return useAxiosSWR(
    occupationId ? API_4IR_OCCUPATIONS + '/' + occupationId : null,
  );
}

export function useFetchFourIROccupations(params: any) {
  return useAxiosSWR([API_4IR_OCCUPATIONS, params]);
}

export function useFetchFourIRTaglines(params: any) {
  return useAxiosSWR([API_4IR_TAGLINES, params]);
}

export function useFetchFourIRTagline(taglineId: number | null) {
  return useAxiosSWR(taglineId ? API_4IR_TAGLINES + '/' + taglineId : null);
}

export function useFetchFourIRResource(resourceId: number | null) {
  return useAxiosSWR(
    resourceId ? API_4IR_Resource_Management + '/' + resourceId : null,
  );
}

export function useFetchFourIRResources(params: any) {
  return useAxiosSWR([API_4IR_Resource_Management, params]);
}

export function useFetchFourIRToT(totId: number | null) {
  return useAxiosSWR(totId ? API_4IR_TOT + '/' + totId : null);
}

export function useFetchFourIRToTs(params: any) {
  return useAxiosSWR([API_4IR_TOT, params]);
}

export function useFetch4IRProjectAnalysis(analysisId: number | null) {
  return useAxiosSWR(
    analysisId ? API_4IR_PROJECT_ANALYSIS + '/' + analysisId : null,
  );
}

export function useFetchAll4IRProjectAnalysis(params: any) {
  return useAxiosSWR([API_4IR_PROJECT_ANALYSIS, params]);
}
