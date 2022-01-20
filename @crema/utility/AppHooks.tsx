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
  COOKIE_KEY_AUTH_ID_TOKEN,
} from '../../shared/constants/AppConst';
import {AppState} from '../../redux/store';
import {USER_LOADED} from '../../redux/types/actions/Auth.actions';
import {
  AuthUser,
  CommonAuthUser,
} from '../../redux/types/models/CommonAuthUser';
import {getBrowserCookie} from '../../@softbd/libs/cookieInstance';
import {
  refreshAppAccessToken,
  setDefaultAuthorizationHeader,
} from '../../@softbd/libs/axiosInstance';
import {CurrentInstitute} from '../../redux/types/models/Vendor';

/**
 * Get auth access token on app initialized.
 */
export const useAuthToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  useEffect(() => {
    const validateAuth = async () => {
      const appAccessTokenData = getBrowserCookie(COOKIE_KEY_APP_ACCESS_TOKEN);
      if (!appAccessTokenData || !appAccessTokenData?.access_token) {
        await refreshAppAccessToken();
      }
      dispatch(fetchStart());

      const authAccessTokenData = getBrowserCookie(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
      );
      const idToken = getBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN);
      if (!authAccessTokenData || !idToken) {
        dispatch(fetchSuccess());
        dispatch({type: USER_LOADED});
        return;
      }
      dispatch(setAuthAccessTokenData(authAccessTokenData));
      //TODO: temporary
      setDefaultAuthorizationHeader(authAccessTokenData?.access_token);
      try {
        await loadAuthUser(dispatch, {
          ...authAccessTokenData,
          ...{id_token: idToken},
        });
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

/**
 * Get app access token on app initialized.
 */
export const useAppToken = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateAppToken = async () => {
      try {
        const appAccessTokenData = getBrowserCookie(
          COOKIE_KEY_APP_ACCESS_TOKEN,
        );
        if (!appAccessTokenData || !appAccessTokenData?.access_token) {
          await refreshAppAccessToken();
        }
        return;
      } catch (err) {
        await validateAppToken();
        return;
      }
    };

    const checkAppToken = () => {
      Promise.all([validateAppToken()]).then(() => {
        setLoading(false);
      });
    };
    checkAppToken();
  }, []);

  return [loading];
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
  return {
    id: 26,
    title: 'যুব উন্নয়ন অধিদপ্তর',
    title_en: 'DYD',
    domain: 'https://dyd.nise.gov.bd',
    code: 'dyd',
    address: 'যুব উন্নয়ন অধিদপ্তর , যুব ভবন ১০৮, মতিঝিল বা/এ, ঢাকা-১০০০',
    loc_division_id: 3,
    division_title: 'ঢাকা',
    division_title_en: 'Dhaka',
    loc_district_id: 18,
    district_title: 'ঢাকা',
    district_title_en: 'DHAKA',
    loc_upazila_id: null,
    upazila_title: null,
    upazila_title_en: null,
    primary_phone: '',
    phone_numbers: [],
    primary_mobile: '01681111111',
    mobile_numbers: [],
    email: 'dyd@nise.gov.bd',
  };
};
