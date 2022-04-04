import {Dispatch} from 'redux';
import {AppActions} from '../types';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {Base64} from 'js-base64';
import {
  getBrowserCookie,
  removeBrowserCookie,
  setBrowserCookie,
} from '../../@softbd/libs/cookieInstance';
import {
  COOKIE_KEY_APP_ACCESS_TOKEN,
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  COOKIE_KEY_AUTH_ID_TOKEN,
  COOKIE_KEY_YOUTH_USER_AS_TRAINER,
} from '../../shared/constants/AppConst';
import {apiGet} from '../../@softbd/common/api';
import {UPDATE_AUTH_USER} from '../types/actions/Auth.actions';
import {
  getCommonAuthUserObject,
  getYouthAuthUserObject,
} from './Authentication';
import {API_YOUTH_PROFILE} from '../../@softbd/common/apiRoutes';
import {adminDomain, youthDomain} from '../../@softbd/common/constants';
import {LINK_FRONTEND_YOUTH_FEED} from '../../@softbd/common/appLinks';

export const loadAuthenticateUser = async (
  dispatch: Dispatch<AppActions | any>,
  loadYouth: boolean,
) => {
  dispatch(fetchStart());
  try {
    const tokenData = getBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);

    const id_token = getBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN);
    if (loadYouth) {
      removeBrowserCookie(COOKIE_KEY_YOUTH_USER_AS_TRAINER);
    } else {
      setBrowserCookie(COOKIE_KEY_YOUTH_USER_AS_TRAINER, 1);
    }

    const ssoTokenData = JSON.parse(
      Base64.decode((id_token || '..').split('.')[1]),
    );


    const coreServicePath = process.env.NEXT_PUBLIC_CORE_SERVICE_PATH;
    const appAccessTokenData = getBrowserCookie(COOKIE_KEY_APP_ACCESS_TOKEN);

    const coreResponse = loadYouth
      ? await apiGet(API_YOUTH_PROFILE, {
          headers: {
            Authorization: 'Bearer ' + appAccessTokenData?.access_token,
            'User-Token': 'Bearer ' + tokenData.access_token,
          },
        })
      : await apiGet(
          coreServicePath + `/users/${ssoTokenData.sub}/permissions`,
          {
            headers: {
              Authorization: 'Bearer ' + appAccessTokenData?.access_token,
              'User-Token': 'Bearer ' + tokenData.access_token,
            },
          },
        );
    //console.log(coreResponse);

    const {data} = coreResponse.data;
    dispatch(fetchSuccess());
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: loadYouth
        ? getYouthAuthUserObject({...ssoTokenData, ...data})
        : getCommonAuthUserObject({...ssoTokenData, ...data}),
    });

    window.location.href = loadYouth
      ? youthDomain() + LINK_FRONTEND_YOUTH_FEED
      : adminDomain();
  } catch (err: any) {
    console.log('error!!!!', err);
    dispatch(fetchError(err));
  }
};
