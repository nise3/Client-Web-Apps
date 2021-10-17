import React from 'react';
import AppPage from '../@softbd/layouts/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const SignUP = asyncComponent(() => import('../modules/auth/Signup'));
export default AppPage(() => <SignUP/>);
