import React, {useCallback, useState} from 'react';
import __ from 'lodash';
import {useAsyncDebounce} from 'react-table';
import {apiGet} from '../common/api';
import {catchBlockHandler} from '../common/helpers';

export const countPaginatePage = (
  totalData: number,
  pageSize: number,
): number => {
  return totalData < 1 ? 0 : Math.ceil(totalData / pageSize);
};

interface TUseFetchData {
  urlPath: string;
  dataAccessor: string;
  dataModifier?: (items: Array<any> | any) => Array<any> | any;
  filters?: any;
  onError?: (e: any) => any;
  paramsValueModifier?: (params: any) => any;
}

interface TReturnUseFetchData {
  onFetchData: () => void;
  data: Array<any> | any;
  loading: boolean;
  pageCount: number;
  totalCount?: number;
}

const useReactTableFetchData = ({
  urlPath,
  dataAccessor,
  dataModifier,
  filters: mappedFilters,
  onError,
  paramsValueModifier,
}: TUseFetchData): TReturnUseFetchData => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageCount, setPageCount] = React.useState(0);
  const [totalCount, setTotalCount] = useState<any>(0);

  const fetchDataFunction = useCallback(
    ({pageIndex, pageSize, sortBy, filters}: any) => {
      setLoading(true);
      let params: any = {
        page: pageIndex + 1,
        page_size: pageSize,
      };

      let keyedFilters = __.keyBy(filters, (item) => item.id);
      if (
        typeof keyedFilters !== 'undefined' &&
        keyedFilters &&
        Object.keys(keyedFilters).length
      ) {
        Object.keys(keyedFilters).forEach((item) => {
          if (mappedFilters?.hasOwnProperty(item) && keyedFilters[item].value) {
            params[mappedFilters[item]] = keyedFilters[item].value;
          } else if (keyedFilters[item].value) {
            params[item] = keyedFilters[item].value;
          }
        });
      }

      if (typeof paramsValueModifier === 'function') {
        let tempParams = {...params};
        let callbackResponse = paramsValueModifier(tempParams);
        if (callbackResponse) {
          params = callbackResponse;
        }
      }

      apiGet(urlPath, {
        params,
      })
        .then((response: any) => {
          let responseData = response.data.hasOwnProperty(dataAccessor)
            ? response.data[dataAccessor] || []
            : [];

          if (dataModifier && typeof dataModifier === 'function') {
            responseData = dataModifier(responseData);
          }
          setData(responseData);
          setTotalCount(response.data?.total);
          setPageCount(countPaginatePage(response.data?.total, pageSize));
        })
        .catch(
          typeof onError === 'function'
            ? onError
            : (e: any) => {
                catchBlockHandler(e);
                console.log(e.message);
              },
        )
        .finally(() => setLoading(false));
    },
    [],
  );

  const onFetchData = useAsyncDebounce(fetchDataFunction);

  return <TReturnUseFetchData>{
    onFetchData,
    data,
    loading,
    pageCount,
    totalCount,
  };
};

export default useReactTableFetchData;
