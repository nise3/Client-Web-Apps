import React from 'react';
import DefaultPage from '../@softbd/layouts/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const SignIn = asyncComponent(() => import('../modules/auth/Signin'));
export default DefaultPage(() => <SignIn />);
