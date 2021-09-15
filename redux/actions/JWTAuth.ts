import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA, defaultUser} from '../../shared/constants/AppConst';
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
          maxAge: Number(tokenData.expires_in),
        },
      );
      dispatch(setAuthAccessTokenData(tokenData));
      await loadAuthUser(dispatch, tokenData);
    } catch (err: any) {
      console.log('error!!!!', err.response.data.error);
    }
  };
};

export const loadAuthUser = async (
  dispatch: Dispatch<AppActions | any>,
  tokenData: TOnSSOSignInCallback,
) => {
  dispatch(fetchStart());
  try {
    const data = JSON.parse(Base64.decode(tokenData.id_token.split('.')[1]));
    const res = {
      data: {
        ...{
          id: 4,
          name: data?.given_name || 'Demo User',
        },
        ...data,
      },
    };
    dispatch(fetchSuccess());
    console.log('res.data', res.data);
    dispatch({
      type: UPDATE_AUTH_USER,
      payload: getUserObject(res.data),
    });
  } catch (err: any) {
    console.log('error!!!!', err.response.error);
    dispatch(fetchError(err.response.error));
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

export const getUserObject = (authUser: any): AuthUser => {
  return {
    authType: AuthType.AUTH2,
    displayName: authUser.name,
    email: authUser.email,
    role: defaultUser.role,
    token: authUser._id,
    uid: authUser._id,
    photoURL: authUser.avatar,
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
