import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../redux/store';
import {Loader} from '../../../../@crema';
import {erplDomain, gotoLoginSignUpPage} from '../../../common/constants';
import {LINK_YOUTH_SIGNUP} from '../../../common/appLinks';

const withData = (ComposedComponent: any) => (props: any) => {
  const {loading, user} = useSelector<AppState, AppState['auth']>(
    ({auth}) => auth,
  );

  useEffect(() => {
    if (!user && !loading) {
      window.location.href = gotoLoginSignUpPage(LINK_YOUTH_SIGNUP);
    }

    if (user && !user.isYouthUser) {
      window.location.href = erplDomain();
    }
  }, [user, loading]);

  if (!user || loading) return <Loader />;

  if (loading) return <Loader />;

  return <ComposedComponent {...props} />;
};
export default withData;
