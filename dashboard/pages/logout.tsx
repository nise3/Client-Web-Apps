import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {onJWTAuthSignout} from '../../redux/actions';
import {useAuthUser} from '../../@crema/utility/AppHooks';
import {useRouter} from 'next/router';
import {removeBrowserCookie} from '../../@softbd/libs/cookieInstance';
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA} from '../../shared/constants/AppConst';

export default () => {
  removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);

  const router = useRouter();
  const authUser = useAuthUser();

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      dispatch(onJWTAuthSignout());
    } else {
      router.push(window.location.origin);
    }
  }, [dispatch, authUser]);

  return <></>;
};
