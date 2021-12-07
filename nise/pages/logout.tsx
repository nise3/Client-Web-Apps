import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {onJWTAuthSignout} from '../../redux/actions';
import {useAuthUser} from '../../@crema/utility/AppHooks';
import {useRouter} from 'next/router';
import {niseDomain} from "../../@softbd/common/constants";
import {CommonAuthUser} from "../../redux/types/models/CommonAuthUser";
import NiseFrontPage from "../../@softbd/layouts/hoc/NiseFrontPage";
import cookieInstance from "../../@softbd/libs/cookieInstance";
import {COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA, COOKIE_KEY_AUTH_ID_TOKEN} from "../../shared/constants/AppConst";

export default NiseFrontPage(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authUser = useAuthUser<CommonAuthUser>();
  const [staleAuthUser, setStaleAuthUser] = useState<any>({});

  useEffect(() => {
    if (authUser) {
      dispatch(onJWTAuthSignout());
      cookieInstance.remove(COOKIE_KEY_AUTH_ACCESS_TOKEN_DATA);
      cookieInstance.remove(COOKIE_KEY_AUTH_ID_TOKEN);
      setStaleAuthUser(authUser);
    } else {
      if (staleAuthUser?.institute?.domain) {
        const logoutUrl = new URL(staleAuthUser?.institute?.domain);
        logoutUrl.pathname = '/logout';
        router.push(logoutUrl.toString());
      } else {
        router.push(niseDomain());
      }
    }
  }, [dispatch, authUser, staleAuthUser]);

  return <></>;
});
