import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {
  fetchStart,
  fetchSuccess,
  loadAuthUser,
  setAuthAccessTokenData,
} from '../../redux/actions';
import {
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
} from '../../shared/constants/AppConst';
import {AppState} from '../../redux/store';
import {USER_LOADED} from '../../redux/types/actions/Auth.actions';
import {
  AuthUser,
  CommonAuthUser,
} from '../../redux/types/models/CommonAuthUser';
import cookieInstance from '../../@softbd/libs/cookieInstance';
import {
  refreshAppAccessToken,
  setDefaultAuthorizationHeader,
} from '../../@softbd/libs/axiosInstance';
import {CurrentInstitute} from '../../redux/types/models/Vendor';

export const useAuthToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  useEffect(() => {
    const validateAuth = async () => {
      //TODO: temporary
      const appAccessTokenData = cookieInstance.get(
        COOKIE_KEY_APP_ACCESS_TOKEN,
      );
      if (!appAccessTokenData && !!appAccessTokenData?.access_token) {
        await refreshAppAccessToken();
      }
      dispatch(fetchStart());

      const authAccessTokenData = cookieInstance.get(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
      );
      if (!authAccessTokenData) {
        dispatch(fetchSuccess());
        dispatch({type: USER_LOADED});
        return;
      }
      dispatch(setAuthAccessTokenData(authAccessTokenData));
      //TODO: temporary
      setDefaultAuthorizationHeader(authAccessTokenData?.access_token);
      try {
        await loadAuthUser(dispatch, authAccessTokenData);
        dispatch(fetchSuccess());
        return;
      } catch (err) {
        dispatch(fetchSuccess());
        return;
      }
    };

    const checkAuth = () => {
      Promise.all([validateAuth()]).then(() => {
        setLoading(false);
        dispatch({type: USER_LOADED});
      });
    };
    checkAuth();
  }, [dispatch]);

  return [loading, user];
};

export const useAuthUser = <
  T extends AuthUser = CommonAuthUser,
>(): T | null => {
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  if (user) {
    return user;
  }

  return null;
};

export const useVendor = <T extends CurrentInstitute = CurrentInstitute>():
  | T
  | null
  | CurrentInstitute => {
  if (useAuthUser()?.isYouthUser) {
    return null;
  } else {
    return {
      id: 23,
      title: 'বিটাক',
      title_en: 'Bitac',
      domain: 'http://bitac.nise3.com',
      code: 'bitac',
      address: 'বাংলাদেশ শিল্প কারিগরি সহায়তা কেন্দ্র (বিটাক) ১১৬ (খ)',
      loc_division_id: 3,
      division_title: 'ঢাকা',
      division_title_en: 'Dhaka',
      loc_district_id: 18,
      district_title: 'ঢাকা',
      district_title_en: 'DHAKA',
      loc_upazila_id: 112,
      upazila_title: 'তেজগাঁও উন্নয়ন সার্কেল',
      upazila_title_en: 'TEJGAON UNNAYAN CIRCLE',
      primary_phone: '',
      phone_numbers: [],
      primary_mobile: '01521306222',
      mobile_numbers: [],
      email: 'ict@btac.gov.bd',
    };
  }
};
