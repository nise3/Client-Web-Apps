import DefaultPage from '../../@softbd/layouts/hoc/DefaultPage';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {onSSOSignInCallback} from '../../redux/actions';
import {useRouter} from 'next/router';

export default DefaultPage(() => {
  const {
    query: {code},
  } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    // const authResult: any = queryString.parse(
    //   window.location.hash.replace('#', ''),
    // );
    // console.log('authResult', authResult);
    if (code) {
      dispatch(onSSOSignInCallback(code as string));
    }
  }, [dispatch, code]);

  return <></>;
});
