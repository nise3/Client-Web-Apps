import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_4IR_PROJECTS} from '../../@softbd/common/apiRoutes';

export function useFetch4IRProject(projectId: number | null) {
  return useAxiosSWR(projectId ? API_4IR_PROJECTS + '/' + projectId : null);
}
