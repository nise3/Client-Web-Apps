import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';
import {AuthUser} from '../../types/models/AuthUser';
import {AppActions} from '../../types';
import {Dispatch} from 'redux';
import {
  SET_AUTH_ACCESS_TOKEN_DATA,
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../../types/actions/Auth.actions';
import {Cookies} from 'react-cookie';
import {Base64} from 'js-base64';
import {apiGet} from '../../@softbd/common/api';
import {CORE_SERVICE_PATH} from '../../@softbd/common/apiRoutes';

// const authUserMockData: TAuthUserSSOResponse = {
//   role: undefined,
//   family_name: 'System',
//   given_name: 'Admin',
//   sub: '4679687976547984545',
//   upn: '5496846497949654989',
//   isInstituteUser: false,
//   isOrganizationUser: false,
//   isSystemUser: true,
//   permissions: [],
//   userType: 'system',
//   username: 'system_admin',
//   email: 'admin@gmail.com',
//   displayName: 'System Admin',
// };

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
      const cookies = new Cookies();
      cookies.set('token', res.data.token, {path: '/'});
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
      const cookies = new Cookies();
      cookies.set('token', res.data.token, {path: '/'});
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
      const cookies = new Cookies();
      cookies.set(
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
    const coreResponse = await apiGet(
      CORE_SERVICE_PATH + `/users/${ssoTokenData.sub}/permissions`,
    );
    //use for test purpose
    // const coreResponse = await apiGet(
    //   `/core/api/v1/users/10df9adb-b6de-457e-9878-ad4dfc0c00b8/permissions`,
    // );
    const {data} = coreResponse.data;
    dispatch(fetchSuccess());
    // console.log('res.data', data);
    dispatch({
      type: UPDATE_AUTH_USER,
      // payload: getUserObject(authUserMockData),
      payload: getUserObject({...data, ...ssoTokenData}),
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
  userType: 'system' | 'institute' | 'organization';
  isSystemUser: boolean;
  isInstituteUser: boolean;
  isOrganizationUser: boolean;
  institute_id?: string | number;
  organization_id?: string | number;
  institute?: Institute;
  organization?: Organization;
  // role: Role;
  role?: Role;
  displayName?: string;
  email?: string;
  username: string;
  permissions: string[];
  photoURL?: string;
};
export const getUserObject = (authUser: TAuthUserSSOResponse): AuthUser => {
  return {
    isInstituteUser: authUser?.isInstituteUser,
    isOrganizationUser: authUser?.isOrganizationUser,
    isSystemUser: authUser?.isSystemUser,
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

/**
 * @deprecated
 */
export const onJWTAuthSignout = () => {
  return (dispatch: Dispatch<AppActions | any>) => {
    dispatch(fetchSuccess());
    setTimeout(() => {
      dispatch({type: SIGNOUT_AUTH_SUCCESS});
      dispatch(fetchSuccess());
      const cookies = new Cookies();
      cookies.remove('token');
    }, 500);
  };
};
