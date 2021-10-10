import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {
  fetchStart,
  fetchSuccess,
  loadAuthUser,
  setAuthAccessTokenData,
} from '../../redux/actions';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';
import {AppState} from '../../redux/store';
import {USER_LOADED} from '../../types/actions/Auth.actions';
import {CommonAuthUser} from '../../types/models/CommonAuthUser';
import cookieInstance from '../../@softbd/libs/cookieInstance';

export const useAuthToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  useEffect(() => {
    const validateAuth = async () => {
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

export const useAuthUser = (): CommonAuthUser | null => {
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  if (user) {
    return user;
  }

  return null;
};
