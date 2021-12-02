import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Loader from '../../../../@crema/core/Loader';
import {AppState} from '../../../../redux/store';
import {getSSOLoginUrl} from '../../../common/SSOConfig';
import {youthDomain} from "../../../common/constants";

const withData = (ComposedComponent: any) => (props: any) => {
    const {user, loading} = useSelector<AppState, AppState['auth']>(
        ({auth}) => auth,
    );
    // const {asPath} = useRouter();
    // const queryParams = asPath.split('?')[1];
    useEffect(() => {
        if (!user && !loading) {
            // Router.push('/signin' + (queryParams ? '?' + queryParams : ''));
            window.location.href = getSSOLoginUrl();
        }
        if (user && user.isYouthUser) {
            window.location.href = youthDomain();
        }
    }, [user, loading]);
    if (!user || loading) return <Loader/>;

    return <ComposedComponent {...props} />;
};

export default withData;
