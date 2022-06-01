import asyncComponent from '../../../@crema/utility/asyncComponent';
import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import React from 'react';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const InstituteFAQ = asyncComponent(
  () => import('../../../modules/institute/faq'),
);

export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.faq']} />
      <InstituteFAQ />
    </>
  );
});
