import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';
import React from 'react';

const Notice = asyncComponent(
  () => import('../../../modules/industry/notice/index'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.notice']} />
      <Notice />
    </>
  );
});
