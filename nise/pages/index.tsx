import asyncComponent from '../../@crema/utility/asyncComponent';
import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';
import PageMeta from '../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';

const Home = asyncComponent(() => import('../../modules/home'));

export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.home']} />
      <Home />
    </>
  );
});
