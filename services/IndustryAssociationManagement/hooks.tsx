import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_INDUSTRY_ASSOCIATION_CONTACT_INFO,
  API_INDUSTRY_ASSOCIATIONS,
} from '../../@softbd/common/apiRoutes';

export function useFetchIndustryAssociations(params: any) {
  return useAxiosSWR([API_INDUSTRY_ASSOCIATIONS, params]);
}

export const useFetchContactInfo = (contactInfoId: number | null) => {
  return useAxiosSWR(
    contactInfoId
      ? API_INDUSTRY_ASSOCIATION_CONTACT_INFO + '/' + contactInfoId
      : null,
  );
};
