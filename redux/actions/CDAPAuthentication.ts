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
import {API_CDAP_AUTHORIZE_ID_TOKEN_GRANT} from '../../@softbd/common/apiRoutes';
import {TOnSSOSignInCallback} from '../../shared/Interface/IAuthentication';
import axios from 'axios';

type TOnCDAPSignInCallbackIdToken = string;

export const onCDAPSignInCallback = (
  id_token: TOnCDAPSignInCallbackIdToken,
  redirected_from?: string,
  session_state?: string,
) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const redirectUrl = new URL(getHostUrl() + '/callback');
    if (redirected_from) {
      redirectUrl.search = paramsBuilder({redirected_from: redirected_from});
    }

    const apiKey = process.env.NEXT_PUBLIC_BACK_CHANNEL_API_KEY
      ? process.env.NEXT_PUBLIC_BACK_CHANNEL_API_KEY
      : null;

    try {
      const {data: tokenData}: {data: TOnSSOSignInCallback} = await axios.post(
        API_CDAP_AUTHORIZE_ID_TOKEN_GRANT,
        {
          id_token,
          redirect_uri: redirectUrl.toString(),
        },
        {
          headers: {
            apikey: apiKey,
          },
        },
      );

      console.log('on CDAP SignInCallback', tokenData);

      let expireDate = new Date();
      expireDate.setTime(
        new Date().getTime() + Number(tokenData.expires_in) * 1000,
      );

      await setBrowserCookie(COOKIE_KEY_SSO_SESSION_STATE, session_state, {
        expires: expireDate,
      });

      await setBrowserCookie(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
        JSON.stringify({
          access_token: tokenData.access_token,
          expires_in: tokenData.expires_in,
          refresh_token: tokenData.refresh_token,
        }),
        {expires: expireDate},
      );

      await setBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN, tokenData.id_token, {
        expires: expireDate,
      });

      //TODO: temporary
      setDefaultAuthorizationHeader(tokenData?.access_token);
      await dispatch(setAuthAccessTokenData(tokenData));
      await loadAuthUser(dispatch, tokenData);
    } catch (err: any) {
      console.log('onSSOSignInCallback - error!!!!', err);
    }
  };
};
