import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {onJWTAuthSignout} from '../redux/actions';
import {useAuthUser} from '../@crema/utility/AppHooks';
import {useRouter} from 'next/router';

export default () => {
  const router = useRouter();
  const authUser = useAuthUser();

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      dispatch(onJWTAuthSignout());
    } else {
      router.push('/');
    }
  }, [dispatch, authUser]);

  return <></>;
};
