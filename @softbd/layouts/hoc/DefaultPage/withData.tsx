import React, {useEffect} from 'react';
import Router, {useRouter} from 'next/router';
import Loader from '../../../../@crema/core/Loader';
import {useSelector} from 'react-redux';
import {AppState} from '../../../../redux/store';
import {adminDomain, youthDomain} from '../../../common/constants';
import {LINK_FRONTEND_YOUTH_FEED} from '../../../common/appLinks';

const withData = (ComposedComponent: any) => (props: any) => {
  const {user: authUser, loading} = useSelector<AppState, AppState['auth']>(
    ({auth}) => auth,
  );

  const {query} = useRouter();
  //const queryParams = asPath.split('?')[1];
  useEffect(() => {
    if (authUser) {
      if (authUser?.isYouthUser) {
        /**If url contains "redirected_from" then redirect to this url*/
        if (query?.redirected_from) {
          Router.push(String(query.redirected_from));
        } else {
          Router.push(youthDomain() + LINK_FRONTEND_YOUTH_FEED);
        }
      } else if (
        authUser?.isSystemUser ||
        authUser?.isOrganizationUser ||
        authUser?.isInstituteUser
      ) {
        /*let params = queryParams
          ?.split('&')
          .filter((param) => !param.startsWith('redirected_from'))
          .join('&');
        Router.push(adminDomain() + (params ? '?' + params : ''));*/
        Router.push(adminDomain());
      } else {
        //TODO: will change logic latter.
        //Router.push(adminDomain() + (queryParams ? '?' + queryParams : ''));
        Router.push(adminDomain());
      }
    }
  }, [authUser]);

  if (loading) return <Loader />;
  if (authUser) return <Loader />;

  return <ComposedComponent {...props} />;
};
export default withData;
