import DefaultPage from '../../@softbd/layouts/hoc/DefaultPage';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {onSSOSignInCallback} from '../../redux/actions';
import {useRouter} from 'next/router';
import * as queryString from 'querystring';
import {onCDAPSignInCallback} from '../../redux/actions/CDAPAuthentication';

export default DefaultPage(() => {
  console.log('call in indiside callback: ');
  const router = useRouter();
  const query = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('call in callback: ');
    const authResult: any = queryString.parse(
      window.location.hash.replace('#', ''),
    );

    console.log('authResult: ', authResult);

    if (authResult?.id_token) {
      console.log('in if id_token: ');
      dispatch(
        onCDAPSignInCallback(
          authResult,
          router,
          authResult?.redirected_from as string,
        ),
      );
    } else if (query && query.code) {
      console.log('in else if query');
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
