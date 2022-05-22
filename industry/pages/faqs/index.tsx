import asyncComponent from '../../../@crema/utility/asyncComponent';
import React from 'react';
import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const IndustryAssociationFAQ = asyncComponent(
  () => import('../../../modules/institute/faq'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.faq']} />
      <IndustryAssociationFAQ />
    </>
  );
});
