import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_INDUSTRY_ASSOCIATIONS} from '../../@softbd/common/apiRoutes';

export function useFetchIndustryAssociations(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATIONS, params]);
}
