import {useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import {onJWTAuthSignout} from '../../redux/actions';
import {useAuthUser} from '../../@crema/utility/AppHooks';
import {useRouter} from 'next/router';
import {niseDomain} from "../../@softbd/common/constants";
import {CommonAuthUser} from "../../redux/types/models/CommonAuthUser";
import NiseFrontPage from "../../@softbd/layouts/hoc/NiseFrontPage";

export default NiseFrontPage(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authUser = useAuthUser<CommonAuthUser>();
  const [staleAuthUser, setStaleAuthUser] = useState<any>({});

  useEffect(() => {
    if (authUser) {
      dispatch(onJWTAuthSignout());
      setStaleAuthUser(authUser);
    } else {
      if (staleAuthUser?.institute?.domain) {
        router.push(staleAuthUser?.institute?.domain);
      } else {
        router.push(niseDomain());
      }
    }
  }, [dispatch, authUser, staleAuthUser]);

  return <></>;
});
