import AppPage from '../@crema/hoc/DefaultPage';
import * as queryString from 'querystring';

export default AppPage(() => {
  const authResult = queryString.parse(window.location.hash.replace('#', ''));
  console.log('authResult', authResult);

  return <></>;
});
