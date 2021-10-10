import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';
import {CommonAuthUser, YouthAuthUser} from '../../types/models/CommonAuthUser';
import {AppActions} from '../../types';
import {Dispatch} from 'redux';
import {
  SET_AUTH_ACCESS_TOKEN_DATA,
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../../types/actions/Auth.actions';
import {Base64} from 'js-base64';
import {apiGet} from '../../@softbd/common/api';
import {
  CORE_SERVICE_PATH,
  YOUTH_SERVICE_PATH,
} from '../../@softbd/common/apiRoutes';
import UserTypes from '../../@softbd/utilities/UserTypes';
import cookieInstance from '../../@softbd/libs/cookieInstance';
import {Gender} from '../../@softbd/utilities/Genders';

/**
 * @deprecated
 * @param body
 */
export const onJwtUserSignUp = (body: {
  email: string;
  password: string;
  name: string;
}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      const res = await jwtAxios.post('users', body);
      cookieInstance.set('token', res.data.token, {path: '/'});
      dispatch(setJWTToken(res.data.token));
      // await loadJWTUser(dispatch);
    } catch (err: any) {
      console.log('error!!!!', err.response.data.error);
      dispatch(fetchError(err.response.data.error));
    }
  };
};

/**
 * @deprecated
 * @param body
 */
export const onJwtSignIn = (body: {email: string; password: string}) => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch(fetchStart());
    try {
      // const res = await jwtAxios.post('auth', body);
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY0ZjE5ZWNjN2Y5ZGEwMDE3ZDg1YmFkIn0sImlhdCI6MTU5OTA3MDc3MCwiZXhwIjoxNTk5NTAyNzcwfQ.fK3L6ZmU8S7I-i21kJj_0sA212JOPgFaTWeSeAUaORQ';
      const res = {
        data: {
          token: token,
        },
      };
      cookieInstance.set('token', res.data.token, {path: '/'});
      dispatch(setJWTToken(res.data.token));
      // await loadJWTUser(dispatch);
    } catch (err: any) {
      console.log('error!!!!', err.response.data.error);
      dispatch(fetchError(err.response.data.error));
    }
  };
};

type TOnSSOSignInCallback = {
  access_token: string; // Inorder to consume api, use access token to authorize.
  expires_in: string | number; // token lifetime in second
  id_token: string; // {Header, payload, signature}
  session_state: string; // I don't know.
};

export const onSSOSignInCallback = (tokenData: TOnSSOSignInCallback) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      cookieInstance.set(
        COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
        JSON.stringify(tokenData),
        {
          path: '/',
        },
      );
      dispatch(setAuthAccessTokenData(tokenData));
      await loadAuthUser(dispatch, tokenData);
    } catch (err: any) {
      console.log('onSSOSignInCallback - error!!!!', err);
    }
  };
};

export const loadAuthUser = async (
  dispatch: Dispatch<AppActions | any>,
  tokenData: TOnSSOSignInCallback,
) => {
  // console.log('loadAuthUser() - tokenData - ', tokenData);
  dispatch(fetchStart());
  try {
    const ssoTokenData = JSON.parse(
      Base64.decode((tokenData.id_token || '..').split('.')[1]),
    );
    console.log(ssoTokenData);
    const coreResponse =
      ssoTokenData.userType == UserTypes.YOUTH_USER
        ? await apiGet(YOUTH_SERVICE_PATH + '/youth-profile')
        : await apiGet(
            CORE_SERVICE_PATH + `/users/${ssoTokenData.sub}/permissions`,
          );
    console.log(coreResponse);

    const {data} = coreResponse.data;
    dispatch(fetchSuccess());
    dispatch({
      type: UPDATE_AUTH_USER,
      payload:
        ssoTokenData.userType == UserTypes.YOUTH_USER
          ? getYouthAuthUserObject({...data, ...ssoTokenData})
          : getCommonAuthUserObject({...data, ...ssoTokenData}),
    });
  } catch (err: any) {
    console.log('error!!!!', err);
    dispatch(fetchError(err));
  }
};

/**
 * @deprecated
 * @param token
 */
export const setJWTToken = (token: string | null): AppActions | any => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

export const setAuthAccessTokenData = (
  data: TOnSSOSignInCallback,
): AppActions | any => ({
  type: SET_AUTH_ACCESS_TOKEN_DATA,
  payload: data,
});

type TAuthUserSSOResponse = {
  sub: string;
  upn: string;
  given_name: string;
  family_name: string;
  userType: 'system' | 'institute' | 'organization' | 'youth';
  isSystemUser: boolean;
  isInstituteUser: boolean;
  isOrganizationUser: boolean;
  institute_id?: string | number;
  organization_id?: string | number;
  institute?: Institute;
  organization?: Organization;
  role?: Role;
  displayName?: string;
  email?: string;
  username: string;
  permissions: string[];
  photoURL?: string;
};

type TYouthAuthUserSSOResponse = {
  sub: string;
  upn: string;
  given_name: string;
  family_name: string;
  userType: 'youth';
  displayName?: string;
  email?: string;
  username: string;
  permissions: string[];
  photoURL?: string;
  date_of_birth: string;
  first_name: string;
  gender: Gender;
  last_name: string;
  last_name_en?: string;
  mobile: string;
};

export const getCommonAuthUserObject = (
  authUser: TAuthUserSSOResponse,
): CommonAuthUser => {
  return {
    isInstituteUser: authUser?.isInstituteUser,
    isOrganizationUser: authUser?.isOrganizationUser,
    isSystemUser: authUser?.isSystemUser,
    isYouthUser: false,
    userType: authUser?.userType,
    institute_id: authUser?.institute_id,
    institute: authUser?.institute,
    organization_id: authUser?.organization_id,
    organization: authUser?.organization,
    authType: AuthType.AUTH2,
    displayName: authUser?.displayName,
    email: authUser?.email,
    role: authUser?.role,
    uid: authUser.sub,
    username: authUser.username,
    permissions: authUser.permissions,
    photoURL: authUser?.photoURL,
  };
};

export const getYouthAuthUserObject = (
  authUser: TYouthAuthUserSSOResponse,
): YouthAuthUser => {
  return {
    isYouthUser: true,
    userType: authUser?.userType,
    authType: AuthType.AUTH2,
    displayName: authUser?.displayName,
    email: authUser?.email,
    uid: authUser.sub,
    username: authUser.username,
    date_of_birth: authUser.date_of_birth,
    first_name: authUser.first_name,
    gender: authUser.gender,
    last_name: authUser.last_name,
    last_name_en: authUser?.last_name_en,
    mobile: authUser.mobile,
  };
};

/**
 * @deprecated
 */
export const onJWTAuthSignout = () => {
  return (dispatch: Dispatch<AppActions | any>) => {
    dispatch(fetchSuccess());
    setTimeout(() => {
      dispatch({type: SIGNOUT_AUTH_SUCCESS});
      dispatch(fetchSuccess());
      cookieInstance.remove('token');
    }, 500);
  };
};
