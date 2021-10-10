import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_YOUTH_SKILLS} from '../../@softbd/common/apiRoutes';
import {API_YOUTH_REFERENCES} from '../../@softbd/common/apiRoutes';

export function useFetchYouthSkills(params: any) {
  return useAxiosSWR([API_YOUTH_SKILLS, params]);
}

export function useFetchYouthReferences() {
  return useAxiosSWR(API_YOUTH_REFERENCES);
}
export function useFetchReference(referenceId: number | null) {
  return useAxiosSWR(
    referenceId ? API_YOUTH_REFERENCES + '/' + referenceId : null,
  );
}
