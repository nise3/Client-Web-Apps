import DefaultPage from '../@softbd/layouts/hoc/DefaultPage';
import * as queryString from 'querystring';
import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {onSSOSignInCallback} from '../redux/actions';

export default DefaultPage(() => {
  const dispatch = useDispatch();

  useEffect(() => {
    const authResult: any = queryString.parse(
      window.location.hash.replace('#', ''),
    );
    console.log('authResult', authResult);
    dispatch(onSSOSignInCallback(authResult));
  }, [dispatch]);

  return <></>;
});
