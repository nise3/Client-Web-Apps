import useSWR from 'swr';
import {apiGet} from '../common/api';

function common({mutate, error, data: responseData, isValidating}: any) {
  const {data: {data = undefined, ...metaData} = {}} = responseData || {};

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
