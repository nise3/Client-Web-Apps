import useSWR from 'swr';
import {apiGet} from '../../@softbd/common/api';
import {CORE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

const API_DIVISIONS = CORE_SERVICE_PATH + '/divisions';

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

export function useFetchDivision(divisionId: number) {
  const {
    data: {data = undefined, ...metaData} = {},
    error,
    isValidating,
  } = useSWR(API_DIVISIONS + '/' + divisionId, apiGet);
  return {
    data,
    metaData,
    isLoading: !data && !error,
    error,
    isValidating,
  };
}
