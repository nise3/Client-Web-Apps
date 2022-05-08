import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_4IR_CELL,
  API_4IR_CS,
  API_4IR_Curriculum,
  API_4IR_OCCUPATIONS,
  API_4IR_PROJECTS,
  API_4IR_SCALE_UP,
  API_4IR_TAGLINES,
} from '../../@softbd/common/apiRoutes';

export function useFetch4IRProject(projectId: number | null) {
  return useAxiosSWR(projectId ? API_4IR_PROJECTS + '/' + projectId : null);
}

export function useFetch4IRCell(cellId: number | null) {
  return useAxiosSWR(cellId ? API_4IR_CELL + '/' + cellId : null);
}

export function useFetch4IRCS(CSId: number | null) {
  return useAxiosSWR(CSId ? API_4IR_CS + '/' + CSId : null);
}

export function useFetch4IRCBLM(CBLMId: number | null) {
  return useAxiosSWR(CBLMId ? API_4IR_CS + '/' + CBLMId : null);
}

export function useFetch4IRCurriculum(CurrId: number | null) {
  return useAxiosSWR(CurrId ? API_4IR_Curriculum + '/' + CurrId : null);
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
