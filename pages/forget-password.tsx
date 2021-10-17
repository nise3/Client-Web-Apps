import React from 'react';
import AppPage from '../@softbd/layouts/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const ForgetPassword = asyncComponent(() => import('../modules/auth/ForgetPassword'));
export default AppPage(() => <ForgetPassword/>);
