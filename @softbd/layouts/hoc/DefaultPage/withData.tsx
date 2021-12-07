import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import Loader from '../../../../@crema/core/Loader';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../redux/store';
import {adminDomain, youthDomain} from "../../../common/constants";
import {LINK_FRONTEND_YOUTH_FEED} from "../../../common/appLinks";

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
          youthDomain() + LINK_FRONTEND_YOUTH_FEED + (queryParams ? '?' + queryParams : ''),
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
        //TODO: will change logic latter.
        Router.push(
          adminDomain() + (queryParams ? '?' + queryParams : ''),
        );
      }
    }
  }, [authUser]);

  if (loading) return <Loader />;
  if (authUser) return <Loader />;

  return <ComposedComponent {...props} />;
};
export default withData;
