import ErplDefaultFrontPage from '../../@softbd/layouts/hoc/ErplDefaultFrontPage';
import React from 'react';
import asyncComponent from '../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';
import PageMeta from '../../@crema/core/PageMeta';

const Erpl = asyncComponent(() => import('../../modules/erpl'));

export default ErplDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['common.rpl'] as string} />
      <Erpl />
    </>
  );
});
