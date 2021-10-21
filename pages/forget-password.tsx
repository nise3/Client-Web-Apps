import React from 'react';
import DefaultPage from '../@softbd/layouts/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const ForgetPassword = asyncComponent(() => import('../modules/auth/ForgetPassword'));
export default DefaultPage(() => <ForgetPassword/>);
