import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_TRAINERS} from '../../@softbd/common/apiRoutes';

export function useFetchTrainer(trainerId: number | null) {
  return useAxiosSWR(trainerId ? API_TRAINERS + '/' + trainerId : null);
}
