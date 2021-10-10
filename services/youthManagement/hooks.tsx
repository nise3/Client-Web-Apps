import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_YOUTH_PROFILE,
  API_YOUTH_SKILLS,
} from '../../@softbd/common/apiRoutes';

export function useFetchYouthSkills(params: any) {
  return useAxiosSWR([API_YOUTH_SKILLS, params]);
}

export function useFetchYouthProfile() {
  return useAxiosSWR(API_YOUTH_PROFILE);
}
