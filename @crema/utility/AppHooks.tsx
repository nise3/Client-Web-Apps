import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {fetchStart, fetchSuccess, setJWTToken} from '../../redux/actions';
import {AuthType} from '../../shared/constants/AppEnums';
import {defaultUser} from '../../shared/constants/AppConst';
import {Cookies} from 'react-cookie';
import {AppState} from '../../redux/store';
import {UPDATE_AUTH_USER, USER_LOADED} from '../../types/actions/Auth.actions';

export const useAuthToken = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  useEffect(() => {
    const validateAuth = async () => {
      dispatch(fetchStart());
      const cookies = new Cookies();
      const token = cookies.get('token');
      if (!token) {
        dispatch(fetchSuccess());
        dispatch({type: USER_LOADED});
        return;
      }
      dispatch(setJWTToken(token));
      try {
        // const res = await jwtAxios.get('/auth');
        const res = {
          data: {
            id: 4,
            name: 'Demo User',
            email: 'demo@ample.com',
            email_verified_at: null,
            created_at: '2020-09-03T04:25:55.000000Z',
            updated_at: '2020-09-03T04:25:55.000000Z',
            _id: 4,
            avatar: '',
          },
        };
        dispatch(fetchSuccess());
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: {
            authType: AuthType.JWT_AUTH,
            displayName: res.data.name,
            email: res.data.email,
            role: defaultUser.role,
            token: res.data._id,
            photoURL: res.data.avatar,
          },
        });
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

export const useAuthUser = () => {
  const {user} = useSelector<AppState, AppState['auth']>(({auth}) => auth);

  if (user) {
    return {...user};
  }
  return null;
};
