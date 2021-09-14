import jwtAxios from '../../@crema/services/auth/jwt-auth/jwt-api';
import {fetchError, fetchStart, fetchSuccess} from './Common';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import {AuthUser} from '../../types/models/AuthUser';
import {AppActions} from '../../types';
import {Dispatch} from 'redux';
import {
  SET_AUTH_TOKEN,
  SIGNOUT_AUTH_SUCCESS,
  UPDATE_AUTH_USER,
} from '../../types/actions/Auth.actions';
import {Cookies} from 'react-cookie';
import {Base64} from 'js-base64';

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
  access_token: string;
  expires_in: string | number;
  id_token: string;
  session_state: string;
};

export const onSSOSignInCallback = ({
  access_token,
  expires_in,
  id_token,
  session_state,
}: TOnSSOSignInCallback) => {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const cookies = new Cookies();
      cookies.set('token', access_token, {path: '/'});
      dispatch(setJWTToken(access_token));
      await loadJWTUser(dispatch, id_token);
    } catch (err: any) {
      console.log('error!!!!', err.response.data.error);
    }
  };
};

export const loadJWTUser = async (
  dispatch: Dispatch<AppActions | any>,
  idToken: string,
) => {
  dispatch(fetchStart());
  try {
    console.log('res.data loading');
    // const res = await jwtAxios.get('/auth');
    const data = JSON.parse(Base64.decode(idToken.split('.')[1]));
    console.log(data);
    const res = {
      data: {
        ...{
          id: 4,
          name: data?.given_name || 'Demo User',
          email: 'demo@ample.com',
          email_verified_at: null,
          created_at: '2020-09-03T04:25:55.000000Z',
          updated_at: '2020-09-03T04:25:55.000000Z',
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

export const setJWTToken = (token: string | null): AppActions | any => ({
  type: SET_AUTH_TOKEN,
  payload: token,
});

const getUserObject = (authUser: any): AuthUser => {
  return {
    authType: AuthType.JWT_AUTH,
    displayName: authUser.name,
    email: authUser.email,
    role: defaultUser.role,
    token: authUser._id,
    uid: authUser._id,
    photoURL: authUser.avatar,
  };
};

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
