import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {onJWTAuthSignout} from '../../redux/actions';
import {useAuthUser} from '../../@crema/utility/AppHooks';
import {useRouter} from 'next/router';
import {niseDomain} from '../../@softbd/common/constants';
import {CommonAuthUser} from '../../redux/types/models/CommonAuthUser';
import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';
import {Loader} from '../../@crema';
import {removeBrowserCookie} from '../../@softbd/libs/cookieInstance';
import {
  COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA,
  COOKIE_KEY_AUTH_ID_TOKEN,
  COOKIE_KEY_SSO_SESSION_STATE,
} from '../../shared/constants/AppConst';

export default NiseFrontPage(() => {
  removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
  removeBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN);
  removeBrowserCookie(COOKIE_KEY_SSO_SESSION_STATE);

  const dispatch = useDispatch();
  const router = useRouter();
  const authUser = useAuthUser<CommonAuthUser>();
  const [staleAuthUser, setStaleAuthUser] = useState<any>({});

  useEffect(() => {
    if (authUser) {
      dispatch(onJWTAuthSignout());
      setStaleAuthUser(authUser);
    } else {
      if (staleAuthUser?.domain) {
        const logoutUrl = new URL(staleAuthUser?.domain);
        logoutUrl.pathname = '/logout';
        console.log('the logout url: ', logoutUrl.toString());
        window.location.href = logoutUrl.toString();
      } else {
        router.push(niseDomain());
      }
    }
  }, [dispatch, authUser, staleAuthUser]);

  return <Loader />;
});
