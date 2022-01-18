import useSWR from 'swr';
import {apiGet} from '../common/api';

function common<T = any>({
  mutate,
  error,
  data: responseData,
  isValidating,
}: any) {
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

export function useAxiosSWR<T = any>(deps: any[] | string | null) {
  console.count('useAxiosSWR');
  return common<T>(
    useSWR(deps, (url, params) => {
      return apiGet(url, {params});
    }),
  );
}
