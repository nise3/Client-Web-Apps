import useSWR from 'swr';
import {apiGet} from '../common/api';
import {useIntl} from 'react-intl';
import {useEffect, useState} from 'react';
import {getBrowserCookie} from '../libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../shared/constants/AppConst';

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
  return common<T>(useSWR(deps, (url, params) => apiGet(url, {params})));
}

export function useDataLocalizationAxiosSWR<T = any>(
  deps: any[] | string | null,
) {
  const data = common<T>(useSWR(deps, (url, params) => apiGet(url, {params})));

  const {locale} = useIntl();
  const [newDataObject, setNewDataObject] = useState<any>(data);
  const [loc, setLoc] = useState<any>(locale);
  const language = getBrowserCookie(COOKIE_KEY_APP_CURRENT_LANG) || 'bn';

  useEffect(() => {
    if (
      newDataObject?.isLoading != data?.isLoading ||
      newDataObject?.data != data?.data ||
      loc != locale
    ) {
      const objIN = {...data};
      if (locale != loc || language != 'bn') {
        if (Array.isArray(objIN.data)) {
          for (let i = 0; i < objIN.data.length; i++) {
            objIN.data[i] = swapLocalText(objIN.data[i]);
          }
        } else {
          objIN.data = swapLocalText(objIN.data);
        }
      }
      setLoc(locale);
      setNewDataObject(objIN);
    }
  }, [data, locale]);

  return newDataObject;
}

const swapLocalText = (dataObject: any) => {
  for (let k in dataObject) {
    if (dataObject.hasOwnProperty(k) && k.endsWith('_en')) {
      const s = k.substr(0, k.length - 3);

      let temp = dataObject[s];
      dataObject[s] = dataObject[k] ? dataObject[k] : temp;
      dataObject[k] = temp;
    }
  }

  return dataObject;
};
