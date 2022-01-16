import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_INDUSTRY_ASSOCIATION_PROFILE,
  API_INDUSTRY_ASSOCIATIONS,
  API_INDUSTRY_ASSOCIATION_CONTACT_INFO,
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

export function useFetchIndustryAssocProfile() {
  return useAxiosSWR(API_INDUSTRY_ASSOCIATION_PROFILE);
}
