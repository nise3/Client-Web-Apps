import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_INDUSTRY_MEMBERS,
  API_APPLICATIONS_LISTS,
  API_INDUSTRY_PUBLICATIONS,
} from '../../@softbd/common/apiRoutes';


export function useFetchPublications(params: any) {
  return useAxiosSWR([API_INDUSTRY_PUBLICATIONS, params]);
}

export function useFetchPublication(publicationId: number | null) {
  return useAxiosSWR(
    publicationId ? API_INDUSTRY_PUBLICATIONS + '/' + publicationId : null,
  );
}
/**Application list**/
export function useFetchApplicationList(listId: number | null) {
  return useAxiosSWR(listId ? API_APPLICATIONS_LISTS + '/' + listId : null);
}

export function useFetchIndustryMembers(params: any) {
  return useAxiosSWR([API_INDUSTRY_MEMBERS, params]);
}

export function useFetchIndustryMember(memberId: number | null) {
  return useAxiosSWR(memberId ? API_INDUSTRY_MEMBERS + '/' + memberId : null);
}
