import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const YouthFAQ = asyncComponent(() => import('../../../modules/institute/faq'));

export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.faq']} />
      <YouthFAQ />
    </>
  );
});
