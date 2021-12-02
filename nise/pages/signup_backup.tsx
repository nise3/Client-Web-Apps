import React from 'react';
import DefaultPage from '../../@softbd/layouts/hoc/DefaultPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Signup_backup = asyncComponent(() => import('../../modules/auth/Signup'));
export default DefaultPage(() => <Signup_backup />);
