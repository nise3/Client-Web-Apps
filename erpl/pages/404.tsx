import React from 'react';
import DefaultPage from '../../@softbd/layouts/hoc/DefaultPage';
import asyncComponent from '../../@crema/utility/asyncComponent';

const Error404 = asyncComponent(
  () => import('../../modules/errorPages/Error404'),
);
export default DefaultPage(() => <Error404 />);
