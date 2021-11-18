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
  return {
    id: 1,
    title: 'Chester Koss',
    domain: 'https://morar.biz',
    address: 'Hello world',
    code: 'excepturi-non-repudiandae-magni-quaerat-ipsum-aut-quia-alias-sit-omnis-nostrum-quis-fuga-deleniti-excepturi-eos-dicta-tempora-iusto',
  };
};
