import {
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  COOKIE_KEY_AUTH_ID_TOKEN,
  COOKIE_KEY_SSO_SESSION_STATE,
} from '../../shared/constants/AppConst';
import {AppActions} from '../types';
import {Dispatch} from 'redux';
import {setBrowserCookie} from '../../@softbd/libs/cookieInstance';
import {setDefaultAuthorizationHeader} from '../../@softbd/libs/axiosInstance';
import {getHostUrl, paramsBuilder} from '../../@softbd/common/SSOConfig';
import {loadAuthUser, setAuthAccessTokenData} from './Authentication';
import axios from 'axios';
import {CDAPUserLogin} from '../../services/userManagement/UserService';

export const onCDAPSignInCallback = (
  callBackInfo: any,
  redirected_from?: string,
) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const redirectUrl = new URL(getHostUrl() + '/callback');
    if (redirected_from) {
      redirectUrl.search = paramsBuilder({redirected_from: redirected_from});
    }

    try {
      const {data: CDAPUserData}: {data: any} = await axios.post(
        'https://cdap.mygov.bd/api/userinfo',
        {},
        {
          headers: {
            Authorization: callBackInfo?.access_token,
          },
        },
      );

      console.log('on CDAP SignInCallback', CDAPUserData);

      /*      const userInfo = await CDAPUserLogin(CDAPUserData);
      console.log('user info form our api: ', userInfo);*/

      let expireDate = new Date();
      expireDate.setTime(
        new Date().getTime() + Number(callBackInfo?.expires_in) * 1000,
      );

      await setBrowserCookie(
        COOKIE_KEY_SSO_SESSION_STATE,
        callBackInfo?.session_state,
        {
          expires: expireDate,
        },
      );

      await setBrowserCookie(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
        JSON.stringify({
          access_token: callBackInfo?.access_token,
          expires_in: callBackInfo?.expires_in,
          refresh_token: callBackInfo?.refresh_token,
        }),
        {expires: expireDate},
      );

      await setBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN, callBackInfo?.id_token, {
        expires: expireDate,
      });

      //TODO: temporary
      setDefaultAuthorizationHeader(callBackInfo?.access_token);
      await dispatch(setAuthAccessTokenData(callBackInfo));
      await loadAuthUser(dispatch, callBackInfo);
    } catch (err: any) {
      console.log('onSSOSignInCallback - error!!!!', err);
    }
  };
};
