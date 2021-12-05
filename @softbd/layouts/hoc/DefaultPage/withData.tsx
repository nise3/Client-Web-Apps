import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import {
  initialUrl,
} from '../../../../shared/constants/AppConst';
import Loader from '../../../../@crema/core/Loader';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../redux/store';
import {adminDomain, youthDomain} from "../../../common/constants";

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
          youthDomain() + (queryParams ? '?' + queryParams : ''),
        );
      } else if (
        authUser?.isSystemUser ||
        authUser?.isOrganizationUser ||
        authUser?.isInstituteUser
      ) {
        Router.push(
          adminDomain() + (queryParams ? '?' + queryParams : ''),
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
