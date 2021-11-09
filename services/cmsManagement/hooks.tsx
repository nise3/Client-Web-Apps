import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_CMS_GLOBAL_CONFIG, API_PARTNERS} from '../../@softbd/common/apiRoutes';

/** fetches CMS Global Config */
export function useFetchCMSGlobalConfig() {
  return useAxiosSWR(API_CMS_GLOBAL_CONFIG);
}

export function useFetchPartners(params: any) {
  return useAxiosSWR(API_PARTNERS);
}

export function useFetchPartner(partnerId: number) {
  return useAxiosSWR(API_PARTNERS + '/' + partnerId);
}