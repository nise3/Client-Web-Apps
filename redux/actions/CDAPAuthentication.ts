import {
  CDAPUSER_NONCE,
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  COOKIE_KEY_AUTH_ID_TOKEN,
  COOKIE_KEY_CALLBACK_INFO,
  COOKIE_KEY_CDAP_SESSION_STATE,
  COOKIE_KEY_CDAP_USER_DATA,
} from '../../shared/constants/AppConst';
import {AppActions} from '../types';
import {Dispatch} from 'redux';
import {
  getBrowserCookie,
  setBrowserCookie,
} from '../../@softbd/libs/cookieInstance';
import {setDefaultAuthorizationHeader} from '../../@softbd/libs/axiosInstance';
import {getHostUrl, paramsBuilder} from '../../@softbd/common/SSOConfig';
import {loadAuthUser, setAuthAccessTokenData} from './Authentication';
import axios from 'axios';
import {niseDomain, youthDomain} from '../../@softbd/common/constants';
import {
  LINK_FRONTEND_YOUTH_FEED,
  LINK_YOUTH_SIGNUP_CDAP,
} from '../../@softbd/common/appLinks';
import {API_YOUTH_EXIST_CHECK} from '../../@softbd/common/apiRoutes';
import {apiGet} from '../../@softbd/common/api';

export const onCDAPSignInCallback = (
  callBackInfo: any,
  router: any,
  redirected_from?: string,
) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const redirectUrl = new URL(getHostUrl() + '/callback');
    const appAccessTokenData = getBrowserCookie(COOKIE_KEY_APP_ACCESS_TOKEN);
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

      if (CDAPUserData) {
        await setBrowserCookie(CDAPUSER_NONCE, CDAPUserData.nonce);
      }

      let expireDate = new Date();
      expireDate.setTime(
        new Date().getTime() + Number(callBackInfo?.expires_in) * 10000,
      );

      const {data: userInfo}: {data: any} = await apiGet(
        API_YOUTH_EXIST_CHECK,
        {
          headers: {
            Authorization: 'Bearer ' + appAccessTokenData?.access_token,
            'User-Token': 'Bearer ' + callBackInfo.access_token,
          },
        },
      );

      if (!userInfo?.data?.youth_exist) {
        await setBrowserCookie(COOKIE_KEY_CDAP_USER_DATA, CDAPUserData, {
          expires: expireDate,
        });
        await setBrowserCookie(COOKIE_KEY_CALLBACK_INFO, callBackInfo, {
          expires: expireDate,
        });
        await router.push(niseDomain() + LINK_YOUTH_SIGNUP_CDAP);
      } else {
        await setBrowserCookie(
          COOKIE_KEY_CDAP_SESSION_STATE,
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

        await setBrowserCookie(
          COOKIE_KEY_AUTH_ID_TOKEN,
          callBackInfo?.id_token,
          {
            expires: expireDate,
          },
        );

        //TODO: temporary
        setDefaultAuthorizationHeader(callBackInfo?.access_token);
        await dispatch(setAuthAccessTokenData(callBackInfo));
        await loadAuthUser(dispatch, callBackInfo);
        await router.push(youthDomain() + LINK_FRONTEND_YOUTH_FEED);
      }
    } catch (err: any) {
      console.log('onSSOSignInCallback - error!!!!', err);
    }
  };
};
