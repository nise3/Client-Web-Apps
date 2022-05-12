import DefaultPage from '../../@softbd/layouts/hoc/DefaultPage';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {onSSOSignInCallback} from '../../redux/actions';
import {useRouter} from 'next/router';
import * as queryString from 'querystring';
import {onCDAPSignInCallback} from '../../redux/actions/CDAPAuthentication';

export default DefaultPage(() => {
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    const authResult: any = queryString.parse(
      window.location.hash.replace('#', ''),
    );

    console.log('cdap_access_token: ', authResult);

    if (authResult?.id_token) {
      dispatch(
        onCDAPSignInCallback(
          authResult,
          router,
          authResult?.redirected_from as string,
        ),
      );
    } else if (query && query.code) {
      dispatch(
        onSSOSignInCallback(
          query?.code as string,
          query?.redirected_from as string,
          query?.session_state as string,
        ),
      );
    } else {
    }
  }, [dispatch, query.code]);

  return <></>;
});
