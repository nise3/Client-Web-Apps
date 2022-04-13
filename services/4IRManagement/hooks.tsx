import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_4IR_CELL,
  API_4IR_CS,
  API_4IR_PROJECTS,
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
