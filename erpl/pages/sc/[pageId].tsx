import ErplDefaultFrontPage from '../../../@softbd/layouts/hoc/ErplDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';

const StaticContent = asyncComponent(() => import('../../../modules/erpl/sc'));

export default ErplDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['static_content.label'] as string} />
      <StaticContent />
    </>
  );
});
