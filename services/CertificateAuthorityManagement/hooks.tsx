import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_REGISTERED_TRAINING_ORGANIZATIONS} from '../../@softbd/common/apiRoutes';

export function useFetchRTO(rtoId: number | null) {
  return useAxiosSWR(
    rtoId ? API_REGISTERED_TRAINING_ORGANIZATIONS + '/' + rtoId : null,
  );
}
