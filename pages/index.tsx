import React from 'react';
import AppPage from '../@crema/hoc/DefaultPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const Home = asyncComponent(() => import('../modules/home'));
export default AppPage(() => <Home />);
