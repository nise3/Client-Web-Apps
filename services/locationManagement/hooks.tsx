import useSWR from 'swr';
import {apiGet} from '../../@softbd/common/api';
import {API_DISTRICTS, API_DIVISIONS} from '../../@softbd/common/apiRoutes';

export function useFetchDivisions(params: any) {
  const {
    data: {data: {data = undefined, ...metaData} = {}} = {},
    error,
    isValidating,
  } = useSWR([API_DIVISIONS, params], apiGet);
  return {
    data,
    metaData,
    isLoading: !data && !error,
    error,
    isValidating,
  };
}

export function useFetchDivision(divisionId: number | null) {
  const {
    data: {data = undefined, ...metaData} = {},
    error,
    isValidating,
  } = useSWR(divisionId ? API_DIVISIONS + '/' + divisionId : null, apiGet);
  return {
    data,
    metaData,
    isLoading: !!divisionId && !data && !error,
    error,
    isValidating,
  };
}

export function useFetchDistricts(params: any) {
  const {
    data: {data: {data = undefined, ...metaData} = {}} = {},
    error,
    isValidating,
  } = useSWR([API_DISTRICTS, params], apiGet);
  return {
    data,
    metaData,
    isLoading: !data && !error,
    error,
    isValidating,
  };
}

export function useFetchDistrict(districtId: number | null) {
  const {
    data: {data = undefined, ...metaData} = {},
    error,
    isValidating,
  } = useSWR(districtId ? API_DISTRICTS + '/' + districtId : null, apiGet);
  return {
    data,
    metaData,
    isLoading: !!districtId && !data && !error,
    error,
    isValidating,
  };
}
