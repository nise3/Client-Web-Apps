import asyncComponent from '../../../@crema/utility/asyncComponent';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';
import {useIntl} from 'react-intl';

const StaticContent = asyncComponent(() => import('../../../modules/sc'));

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.static_content'] as string} />
      <StaticContent />
    </>
  );
});
