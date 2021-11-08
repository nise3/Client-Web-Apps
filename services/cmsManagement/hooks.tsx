import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_CMS_GLOBAL_CONFIG} from '../../@softbd/common/apiRoutes';

/** fetches CMS Global Config */
export function useFetchCMSGlobalConfig() {
  return useAxiosSWR(API_CMS_GLOBAL_CONFIG);
}
