import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {onJWTAuthSignout} from '../../redux/actions';
import {useAuthUser} from '../../@crema/utility/AppHooks';
import {useRouter} from 'next/router';
import {instituteDomain} from "../../@softbd/common/constants";
import InstituteFrontPage from "../../@softbd/layouts/hoc/InstituteDefaultFrontPage";
import {Loader} from "../../@crema";

export default InstituteFrontPage(() => {
    const router = useRouter();
    const authUser = useAuthUser();

    const dispatch = useDispatch();

    useEffect(() => {
        if (authUser) {
            dispatch(onJWTAuthSignout());
        } else {
            router.push(instituteDomain());
        }
    }, [dispatch, authUser]);

    return <Loader/>;
});
