import useSWR from 'swr';
import {apiGet} from '../common/api';

function common(response: any = {}) {
  const {
    data: responseData,
    isValidating,
    error,
    mutate,
  } = response?.data || {};
  const {data, ...metaData} = responseData || {};

  return {
    data,
    metaData,
    isLoading: isValidating && !data && !error,
    mutate,
    error,
    isValidating,
  };
}

export function useAxiosSWR(deps: any[] | string | null) {
  console.count('useAxiosSWR');
  return common(useSWR(deps, (url, params) => apiGet(url, {params})));
}
