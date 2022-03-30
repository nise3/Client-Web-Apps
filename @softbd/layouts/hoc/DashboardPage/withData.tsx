import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Loader from '../../../../@crema/core/Loader';
import {AppState} from '../../../../redux/store';
import {getSSOLoginUrl} from '../../../common/SSOConfig';
import {adminDomain, youthDomain} from '../../../common/constants';
import {LINK_FRONTEND_YOUTH_FEED} from '../../../common/appLinks';
import {useRouter} from 'next/router';
import {checkHasRoutePermission} from '../../../../@crema/utility/authorizations';

const withData = (ComposedComponent: any) => (props: any) => {
  const {user, loading} = useSelector<AppState, AppState['auth']>(
    ({auth}) => auth,
  );
  const {pathname} = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = getSSOLoginUrl();
    }
    if (user && user.isYouthUser) {
      window.location.href = youthDomain() + LINK_FRONTEND_YOUTH_FEED;
    }

    /** Checking if has route permission*/
    if (user && !user.isYouthUser) {
      let hasPermission = checkHasRoutePermission(user, pathname);
      if (!hasPermission) {
        window.location.href = adminDomain();
      }
    }
  }, [user, loading]);
  if (!user || loading) return <Loader />;

  return <ComposedComponent {...props} />;
};

export default withData;
