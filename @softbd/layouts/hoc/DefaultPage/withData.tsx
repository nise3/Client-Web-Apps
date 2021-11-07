import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {
  COMMON_DASHBOARD_URL,
  initialUrl,
  YOUTH_DASHBOARD_URL,
} from '../../../../shared/constants/AppConst';
import Loader from '../../../../@crema/core/Loader';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../redux/store';

const withData = (ComposedComponent: any) => (props: any) => {
  const {user: authUser, loading} = useSelector<AppState, AppState['auth']>(
    ({auth}) => auth,
  );

  const {asPath} = useRouter();
  const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (authUser) {
      if (authUser?.isYouthUser) {
        Router.push(
          YOUTH_DASHBOARD_URL + (queryParams ? '?' + queryParams : ''),
        );
      } else if (
        authUser?.isSystemUser ||
        authUser?.isOrganizationUser ||
        authUser?.isInstituteUser
      ) {
        Router.push(
          COMMON_DASHBOARD_URL + (queryParams ? '?' + queryParams : ''),
        );
      } else {
        Router.push(initialUrl + (queryParams ? '?' + queryParams : ''));
      }
    }
  }, [authUser]);

  if (loading) return <Loader />;
  if (authUser) return <Loader />;

  return <ComposedComponent {...props} />;
};
export default withData;
