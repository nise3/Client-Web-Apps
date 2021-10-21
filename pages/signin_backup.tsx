import React from 'react';
import DefaultPage from '../@softbd/layouts/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const Signin_backup = asyncComponent(() => import('../modules/auth/Signin'));
export default DefaultPage(() => <Signin_backup />);
