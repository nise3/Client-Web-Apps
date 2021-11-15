import asyncComponent from '../@crema/utility/asyncComponent';
import PageMeta from '../@crema/core/PageMeta';
import React from 'react';
import NiseFrontPage from '../@softbd/layouts/hoc/NiseFrontPage';
import {useIntl} from 'react-intl';

const FAQPage = asyncComponent(() => import('../modules/institute/faq'));
export default NiseFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['footer.faq']} />
      <FAQPage />
    </>
  );
});
