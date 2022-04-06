import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {signOut} from '../../redux/actions';
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
  NOT_LOGOUT_ERROR_CODE,
} from '../../shared/constants/AppConst';

export default NiseFrontPage(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authUser = useAuthUser<CommonAuthUser>();
  const [staleAuthUser, setStaleAuthUser] = useState<any>({});
  const {error, redirected_from} = router.query;

  useEffect(() => {
    if (error && error == NOT_LOGOUT_ERROR_CODE) {
      router.push(redirected_from ? String(redirected_from) : niseDomain());
    } else {
      if (authUser) {
        removeBrowserCookie(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
        removeBrowserCookie(COOKIE_KEY_AUTH_ID_TOKEN);
        removeBrowserCookie(COOKIE_KEY_SSO_SESSION_STATE);
        dispatch(signOut());
        setStaleAuthUser(authUser);
      } else {
        if (!staleAuthUser.isSystemUser && staleAuthUser?.domain) {
          const protocol = window.location.protocol;
          window.location.href =
            protocol + '//' + staleAuthUser?.domain + '/logout';
        } else {
          router.push(niseDomain());
        }
      }
    }
  }, [dispatch, authUser, staleAuthUser]);

  return <Loader />;
});
